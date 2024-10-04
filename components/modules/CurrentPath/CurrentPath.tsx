'use client'

import type { VideoType, Video } from "../../../graphql/queries/videos";
import type { SessionWithJwt } from "@/components/constants/types";
import type { RawTree } from "../../../graphql/queries/learningPaths";
import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import pathQuestionnaireQuery from "../../../graphql/queries/pathQuestionnaire";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { myDataQuery } from "../../../graphql/queries/myData";
import { videosQuery } from "../../../graphql/queries/videos";
import { buildLinearTree } from "../../utils/treeDataUtils";
import { Heading } from "../../core/Heading/Heading";
import { Box } from "../../containers/Box/Box";
import colors from "../../constants/colors";
import { Paragraph } from "../../core/Paragraph/Paragraph";
import { Button } from "../../core/Button/Button";
import getScoreRank from "../../utils/getScoreRank";
import { updateMeMutation } from "../../../graphql/mutations/updateMe";
import { Loader } from "../../modules/Loader/Loader";
import { Overlay } from "../../containers/Overlay/Overlay";
import { ListProgress } from "../ListProgress/ListProgress";
import { allLearningPathsQuery } from "../../../graphql/queries/learningPaths";
import { ScrollMessage } from "./ScrollMessage";
import { archetypeIcons, archetypeDescriptions } from "../../constants/archetypes";
import { LoginForm } from "../LoginForm/LoginForm";
import './currentPath.css';

type Archetypes =
  "Essentialist" | 
  "Researcher" | 
  "Explorer" | 
  "Pragmatist" | 
  "Veteran" | 
  "Adventurer" | 
  "Enthusiast" | 
  "Trailblazer" | 
  "Scholar"

interface ArchetypeAttributes {
  risk: number; 
  experience: number; 
  patience: number; 
  willingness: number;
}

type UserProfile = ArchetypeAttributes & {
  archetype: Archetypes | undefined;
}


const filterByTagConditions = (videos: { attributes: VideoType }[], condition: (any) => boolean) => {
  return videos?.filter(({ attributes }) => {
    const { tags: tagsData } = attributes
    const attributesSet = tagsData?.data
    const tags = attributesSet?.map(({ attributes: { value } }) => value)
    return condition(tags)
  })
}

const filterVideos = (videos: { attributes: VideoType }[], userProfile: UserProfile): { attributes: VideoType }[] => {
  const { archetype } = userProfile
  let filtered = [...videos]

  switch (archetype) {
    // only novice  
    case "Essentialist":
      filtered = filterByTagConditions(videos, tags => tags.includes('novice'))
    //All intro only, risk averse and risk moderate, all series
    case "Researcher":
      filtered = filterByTagConditions(videos, tags => tags.includes('introductory') && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All intro and details, risk averse and risk moderate, all series
    case "Explorer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('introductory') || tags.includes('details')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All details and additional, series 2-5
    case "Pragmatist":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')) && !tags.includes("novice"))
    //All details and additional, risk averse and risk moderate, series 4 & 5
    case "Veteran":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')) && !tags.includes("novice") && !tags.includes("beginner") && !tags.includes("intermediate"))
    //All details and additional, series 4 & 5
    case "Adventurer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('details') || tags.includes('additional')) && !tags.includes("novice") && !tags.includes("beginner") && !tags.includes("intermediate"))
    //Series 3-5
    case "Enthusiast":
      filtered = filterByTagConditions(videos, tags => !tags.includes("novice") && !tags.includes("beginner"))
    //All intro and details and additional, risk averse and risk moderate, all series
    case "Trailblazer":
      filtered = filterByTagConditions(videos, tags => (tags.includes('introductory') || tags.includes('details') || tags.includes('additional')) && (tags.includes('risk_averse') || tags.includes('risk_moderate')))
    //All videos
    case "Scholar":
      filtered = [...videos]
  }

  return filtered;
}

export const getArchetype = ({ risk, experience, patience, willingness }: ArchetypeAttributes): Archetypes => {
  // only novice
  if (risk === 1 && experience === 1 && (patience <= 3 || willingness <= 3)) {
    return "Essentialist"
  }

  //All intro only, risk averse and risk moderate, all series
  if (risk <= 2 && experience === 1 && (patience <= 4 || willingness <= 4)) {
    return "Researcher"
  }

  //All intro and details, risk averse and risk moderate, all series
  if (risk <= 2 && experience === 1 && (patience <= 5 || willingness <= 5)) {
    return "Explorer"
  }

  //All details and additional, series 2-5
  if (
    (experience === 2 && (patience <= 3 || willingness <= 3)) ||
    (experience === 3 && (patience <= 4 || willingness <= 4))
  ) {
    return "Pragmatist"
  }

  //All details and additional, risk averse and risk moderate, series 4 & 5
  if (risk <= 2 && experience === 4 && (patience <= 4 || willingness <= 4)) {
    return "Veteran"
  }

  //All details and additional, series 4 & 5
  if (risk === 3 && experience === 4 && (patience <= 4 || willingness <= 4)) {
    return "Adventurer"
  }

  //Series 3-5
  if (experience === 4 && (patience > 4 || willingness > 4)) {
    return "Enthusiast"
  }

  //All intro and details and additional, risk averse and risk moderate, all series
  if (risk === 1 && experience === 1 && (patience > 5 || willingness > 5)) {
    return "Trailblazer"
  }

  //All videos
  if (risk >= 2 && experience <= 2 && (patience > 5 || willingness > 5)) {
    return "Scholar"
  }

  return "Scholar"
}

export const CurrentPath = () => {
  const session = useSession().data as SessionWithJwt | null;
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchParamKeys = [...(searchParams?.keys() || [])]
  const [ showScrollDownMessage, setShowScrollDownMessage ] = useState<boolean>(false)
  const [ showFullyCompletedMessage, setShowFullyCompletedMessage ] = useState<boolean>(searchParams?.get('allModulesCompleted') === 'true')
  const [ showPersonalPathCompletedMessage, setShowPersonalPathCompletedMessage ] = useState<boolean>(searchParams?.get('customPathCompleted') === 'true')
  const [ showArchetypeOverlay, setShowArchetypeOverlay ] = useState<boolean>(false)
  const [ constructedPath, setConstructedPath ] = useState<string | null | RawTree>(null)
  const [ pathQuestionnaireLoaded, setPathQuestionnaireLoaded ] = useState<boolean>(false)
  const [ nodeCount, setNodeCount ] = useState<number>(0)
  const [ nodeData, setNodeData ] = useState<{ data: RawTree } | null>(null)
  const [ isLoggingIn, setIsLoggingIn ] = useState<boolean>(false)
  const [ isMemberButNeverDidQuestionnaire, setIsMemberButNeverDidQuestionnaire ] = useState<boolean>(false)
  const [ userProfile, setUserProfile ] = useState<UserProfile>({
    risk: 0,
    willingness: 0,
    patience: 0,
    experience: 0,
    archetype: undefined
  })

  const [ updateMe ] = useMutation(updateMeMutation, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}`
      }
    }
  })
  const { data: { videos: { data: videos = [] } = {} } = {} } = useQuery(videosQuery, { variables: { firstModule: 0, lastModule: 999 } })
  const [loadPathQuestionnaire, { data: { pathQuestionnaire: { data: { attributes: pathQuestionnaire = {} } = {} } = {} } = {} }] = useLazyQuery(pathQuestionnaireQuery);
  const { data: { learningPaths: { data: allLearningPaths = {} } = {} } = {} } = useQuery(allLearningPathsQuery)

  const { data: { myData: { progressData = {} } = {} } = {} } = useQuery(myDataQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}`
      },
    },
    skip: session?.status !== 'authenticated',
    fetchPolicy: 'network-only'
  })

  //Once pathQuestionnaire is loaded, build user profile and filter videos
  useEffect(() => {
    if (!!pathQuestionnaire) {
      const { pathQuestionnaireMappings } = pathQuestionnaire
      const newUserAttributes = {...userProfile}

      searchParamKeys.forEach(key => {
        if (key.length === 2 && key[0] === 'q') {
          const answerKey = searchParams?.get(key)
          const questionNumber = parseInt(key.replace('q', ''))
          const targetQuestion = pathQuestionnaireMappings.find(({ questionNumber: qn }) => qn === questionNumber)
          const attributes = targetQuestion?.answerToAttribute?.filter(({ answerKey: key }) => key === answerKey)

          attributes?.forEach(({ attribute, points }) => {
            newUserAttributes[attribute] += points
          })
        }
      })

      newUserAttributes.archetype = getArchetype(newUserAttributes)
      
      setShowArchetypeOverlay(true)
      setUserProfile(newUserAttributes)
    }
  }, [pathQuestionnaire])

  useEffect(() => {
    if (userProfile?.risk > 0 && userProfile?.willingness > 0 && userProfile?.patience > 0 && userProfile?.experience > 0 && !!videos) {
      const filteredVideos = filterVideos(videos, userProfile)
      //const filteredVideos = videos
      const rawTree = buildLinearTree(filteredVideos, progressData)
      setNodeCount(filteredVideos?.length)
      setConstructedPath(rawTree)
    }
  }, [ videos, userProfile, setUserProfile, pathQuestionnaireLoaded, setPathQuestionnaireLoaded ])

  useEffect(() => {
    if (!showScrollDownMessage) {
      setTimeout(() => {
        if (window.scrollY <= window.innerHeight * .2) {
          setShowScrollDownMessage(true)
        }
      }, 5000)
    }
  }, [])


  // if navigating from questionnaire (new user), process questionnaire and set path
  useEffect(() => {
    // this is a user who has just completed the questionnaire for the first time
    if (session?.status !== 'authenticated' && searchParamKeys?.length > 0 && !pathQuestionnaireLoaded) {
      // check if searchParamKeys contains any of the following: "q1", "q2", "q3", "q4"
      const hasQuestionnaireKeys = searchParamKeys?.some(key => key.length === 2 && key[0] === 'q')
      if (hasQuestionnaireKeys) {
        loadPathQuestionnaire()
        setPathQuestionnaireLoaded(true)
      }
    }

    // this could be a user who is already a member but is not logged in
    if (session?.status !== 'authenticated' && searchParamKeys?.length === 0) {
      //prompt login
    }
  }, [session?.status, searchParamKeys])

  // sync user progress to generated tree
  useEffect(() => {
    if (!progressData?.customPath && constructedPath && session?.status === 'authenticated') {
      updateMe({ variables: { progressData: { archetype: userProfile?.archetype, customPath: constructedPath } } })
    }
  }, [ progressData, constructedPath, session?.status ])

  
  useEffect(() => {
    // scroll listener with scroll top is x number of pixels equal to 20% of the viewport height
    const scrollListener = () => {
      if (window.scrollY > window.innerHeight * .2) {
        setShowScrollDownMessage(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])
  

  // prompt user to sign in if unauthenticated. User can choose not to sign in but let them know they won't be able to save progress
  const learningPathTree = progressData?.customPath || constructedPath

  const { attributes: previewModule } = videos?.filter(({ attributes: { lessonModule } }) => lessonModule == nodeData?.data.name)[0] || {}
  const { attributes: currentModule } = videos?.filter(({ attributes: { lessonModule } }) => lessonModule == progressData?.currentModule?.lessonModule)[0] || {}
  const examScore = progressData?.completedModules?.filter(({ lessonModule }) => lessonModule == nodeData?.data.name)[0]?.examScore
  const rank = getScoreRank(examScore)

  const nameMapCallback = (nameMap, nodeName) => {
    return nameMap?.filter(({ attributes: { lessonModule } }) => lessonModule?.toString() === nodeName?.toString())[0]?.attributes?.title
  }
  
  return (
    <Box padding="0" gap="xl" className="relative h-full sm:grid-cols-3">
      {isLoggingIn &&
        <Overlay wrapperClassName="px-4 w-full sm:w-auto" visibility={isLoggingIn} toggleVisibility={setIsLoggingIn}>
          <LoginForm defaultIsRegistering={false} toggleVisibility={setIsLoggingIn}/>
        </Overlay>
      }
      <Box padding="0" className="col-span-1 self-center">
        <Overlay visibility={showArchetypeOverlay} toggleVisibility={setShowArchetypeOverlay}>
          <Box padding="0" className="max-w-[640px]" gap="md">
            <Box padding="0" gap="md" className="sm:grid-cols-[160px,_auto] justify-center sm:justify-start items-center">
              <Box padding="0" className="justify-self-center">
                <img src={userProfile?.archetype ? archetypeIcons[userProfile?.archetype]: archetypeIcons["Scholar"]} alt="archetype icon" width={160} height={160}/>
              </Box>
              <Box padding="0" gap="sm" className="place-items-center sm:place-items-start">
                <Heading type="h4">Here are your results:</Heading>
                <Heading type="h2">{`You are the ${userProfile?.archetype}`}</Heading>
              </Box>
            </Box>
            <Heading type="h4">{userProfile?.archetype ? archetypeDescriptions[userProfile?.archetype]: archetypeDescriptions["Scholar"]}</Heading>
            <Paragraph className="italic">At this point, it's best to sign up now so you can save and track your progress. If you choose not to, it's ok. You can browse the modules but just keep in mind you won't be able to track your progress and your tailored path will be lost.</Paragraph>
            <Button onClick={() => {setShowArchetypeOverlay(false); setIsLoggingIn(true)}} label="Got it!" primary/>
          </Box>
        </Overlay>
        <Overlay visibility={showPersonalPathCompletedMessage} toggleVisibility={setShowPersonalPathCompletedMessage}>
          <Box className="max-w-[640px]">
            <Heading type="h2">You've completed your path! 🎓</Heading>
            <Heading type="h4">Thanks for letting us take you through this journey. It doesn't end here, though. Remember to practice, go through all of the module tests, and keep tuning back in. We'll provide more tools, tips, and regular content to keep you sharp and to continue guiding you through each week as you grow your portfolio! If you want to continue your learning beyond your path, scroll down to find more modules.</Heading>
            <Button onClick={() => setShowPersonalPathCompletedMessage(false)} label="Got it!" primary/>
          </Box>
        </Overlay>
        <Overlay visibility={showFullyCompletedMessage} toggleVisibility={setShowFullyCompletedMessage}>
          <Box className="max-w-[640px]">
            <Heading type="h2">You've completed all of the courses! 🎓</Heading>
            <Heading type="h4">What a long trip it's been. Thanks for letting us take you through this journey. It doesn't end here, though. Remember to practice, go through all of the module tests, and keep tuning back in. We'll provide more tools, tips, and regular content to keep you sharp and to continue guiding you through each week as you grow your portfolio!</Heading>
            <Button onClick={() => setShowFullyCompletedMessage(false)} label="Got it!" primary/>
          </Box>
        </Overlay>


        {session?.status !== 'authenticated' && session?.status !== 'loading' && !!learningPathTree &&
          <>
            <Heading type="h4" className="text-center sm:text-left" fontSizeClass="h4">
              Log in now to save and track your progress.
            </Heading>
            <Button data-cy="log-in-prompt-learning-path" label="Log in" primary onClick={() => setIsLoggingIn(true)}/>
          </>
        }
        <Heading data-cy="pick-up-left-off-text" className="text-center sm:text-left" type="h3">
          {!!currentModule ? 'Pick up where you left off' : 'Start your learning journey'}
        </Heading>
        {!!currentModule &&
          <>
            <Heading type="h4" className="text-center sm:text-left" >
              {currentModule?.title}
            </Heading>
            <Paragraph className="text-center sm:text-left" >
              {currentModule?.description}
            </Paragraph>
            <Button label="Start" primary onClick={() => router.push(`/module/${currentModule?.lessonModule?.toString().replace('.', '-')}`)}/>
          </>
        }
        {!!userProfile?.archetype &&
          <Box padding="0" className="place-self-center">
            <img src={archetypeIcons[userProfile?.archetype]} alt="archetype icon" width={160} height={160}/>
          </Box>
        }
      </Box>
      <Box padding="0" className="sm:col-span-2">
      {learningPathTree ?
        <ListProgress
          isVertical
          nameMapCallback={nameMapCallback}
          nameMap={videos}
          dataCy="current-path"
          globalOnMouseEnter={(node) => setNodeData(node)}
          progressData={progressData}
          //globalOnMouseLeave={() => setNodeData(null)}
          rawTree={learningPathTree}
          highlightValue={progressData?.currentModule?.lessonModule}
          className={`col-span-1 w-full min-h-[${nodeCount * 100}px]`}
          twFaderColor={"night-black"}
          background={colors.nightBlack}
          allLearningPaths={allLearningPaths}
          showAsList
          nodeWidth={12}
          nodeHeight={12} 
          availableModules={[]}        
        />
        :
        !currentModule ?
          <Box padding="0" className="place-items-center">
            <Box padding="0" gap="md" className="justify-center items-center">
              {session?.status === 'loading' && session?.data === null ?
                <Loader/>
                :
                <>
                  {session?.status !== 'authenticated' &&
                    <>
                      <Heading type="h4" className="text-center">Already have an account and you want to pick up where you left off?</Heading>
                      <Button size="lg" label="Yes, log me in" primary onClick={() => setIsLoggingIn(true)}/>
                      <Heading type="h4" className="text-center">If not, you can</Heading>
                    </>
                  }
                  <Button data-cy="tailor-lesson-button" size="lg" label="Tailor my lesson plan" primary={session?.status === 'authenticated'} onClick={() => router.push(`/path`)}/>
                  <Heading type="h4" className="text-center">or</Heading>
                  <Button data-cy="start-from-top-button" size="lg" label="Just start me off from the top" onClick={() => {
                    if (session?.status === 'authenticated') {
                      updateMe({ variables: { progressData: { customPath: null } } })
                    }
                    router.push(`/module/1-01`)
                  }}/>
                </>
              }
            </Box>
          </Box>
          :
          <></>
      }
      </Box>

      <ScrollMessage/>
    </Box>
  )
}
