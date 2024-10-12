'use client'

import type { SessionWithJwt } from '@/components/constants/types';
import type { VideoType } from '@/graphql/queries/videos';
import type { ExamQuestionType } from '@/graphql/queries/examQuestions';
import React, { useState, useEffect } from 'react';
import { Box } from '../../containers/Box/Box';
import { Button } from '../../core/Button/Button';
import { ExamQuestion } from './ExamView/ExamQuestion';
import { Heading } from '../../core/Heading/Heading';
import { ExamCompleted } from './ExamView/ExamCompleted';
import { LearnView } from './LearnView/LearnView';
import { updateCurrentModuleMutation } from '../../../graphql/mutations/updateCurrentModule';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { myDataQuery } from '../../../graphql/queries/myData';
import { Overlay } from '../../containers/Overlay/Overlay';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../LoginForm/LoginForm';

// deck modes
export const EXAM = 'exam'
export const LEARN = 'learn'

interface DeckProps {
  video: VideoType;
  questions: {
    attributes: ExamQuestionType
  }[];
  lessonModuleId: string;
  lessonModule: number;
  orderedPathArray: string[];
}

const traverseCheckIfModulesAllCleared = (tree, myData) => {
  let count = 0;
  let totalModules = 0;
  const completedModulesByName = myData?.progressData?.completedModules?.map(({ lessonModule }) => lessonModule.toString())

  const traverse = (node) => {
    if (node.children) {
      node.children.forEach(child => {
        traverse(child);
      });
    }

    if (completedModulesByName?.includes(node.name)) {
      count++;
    }

    totalModules++;
  }

  traverse(tree);

  // subtract 1 because the last module is the current one
  return count >= totalModules - 1;
}

const traverseCustomPathTree = (tree, lessonModule): string => {
  const currentModule = tree?.children?.find((child) => child?.name === lessonModule.toString())

  if (currentModule) {
    if (currentModule?.children?.length > 0) {
      const moduleCode = currentModule?.children[0]?.name
      return moduleCode?.replace('.', '-')
    } else {
      return "";
    }
  }

  return tree?.children?.reduce((acc, child) => {
    if (acc) {
      return acc
    }

    return traverseCustomPathTree(child, lessonModule)
  }, null)
}

// lessonModuleId is the url module id, lessonModule is the actual Float value for matching
export const Deck: React.FC<DeckProps> = ({ video, questions, lessonModuleId, lessonModule, orderedPathArray }: DeckProps) => {
  const router = useRouter()
  const [ mode, setMode ] = useState<typeof EXAM | typeof LEARN>(LEARN)
  const [ currentQuestion, setCurrentQuestion ] = useState<number>(0)
  const [ numberOfCorrectAnswers, setNumberOfCorrectAnswers ] = useState<number>(0)
  const [ showLoginWarning, setShowLoginWarning ] = useState<boolean>(false)
  const session = useSession().data as SessionWithJwt | null;

  const incrementCorrectAnswers = () => setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1)
  const invokeNextQuestion = () => setCurrentQuestion(currentQuestion + 1)
  const resetExam = () => {
    setCurrentQuestion(0)
    setNumberOfCorrectAnswers(0)
  }

  const question = questions[currentQuestion]?.attributes
  const isCompleted = currentQuestion === questions.length; 

  const [ updateCurrentModule, { data: updateCurrentModuleResponse } ] = useMutation(updateCurrentModuleMutation, {
    context: {
      headers: {
        'Authorization': `Bearer ${session?.data?.jwt}` 
      }
    }
  });

  const { data: { myData } = [] } = useQuery(myDataQuery, { 
    context: { 
      headers: { 
        'Authorization': `Bearer ${session?.data?.jwt}` 
      },
    } ,
    skip: session?.status !== 'authenticated'
  })

  useEffect(() => {
    if (session?.status === 'authenticated') {
      updateCurrentModule({ 
        variables: { 
          moduleData: {
            lessonModule: video?.lessonModule,
            examScore: null
          } 
        }
      })
    }

    if (session?.status!== 'authenticated' && session?.status !== 'loading') {
      setShowLoginWarning(true)
    }
  }, [ session ])


  const getNextModuleUrl = () => {
    const progressData = myData?.progressData;
    const customPathTree = progressData?.customPath;
    const completedModules = progressData?.completedModules;

    // traverse the tree via children to find the current module
    if (!!customPathTree) {
      const allModulesCleared = traverseCheckIfModulesAllCleared(customPathTree, myData);
      const nextCustomModule = traverseCustomPathTree(customPathTree, lessonModule)

      if (!nextCustomModule && allModulesCleared) {
        return '/dashboard?customPathCompleted=true'
      }

      if (!nextCustomModule && !allModulesCleared) {
        return '/dashboard?customPathIncomplete=true'
      }

      return `/module/${nextCustomModule}`
    }

    const indexOfCurrentModule = orderedPathArray?.findIndex((moduleId) => moduleId === lessonModuleId)
    const nextModule = orderedPathArray?.[indexOfCurrentModule + 1]
    const allModulesCompleted = completedModules?.length === orderedPathArray?.length

    if (indexOfCurrentModule === orderedPathArray?.length - 1 && allModulesCompleted) {
      return '/dashboard?allModulesCompleted=true'
    }

    if (indexOfCurrentModule === orderedPathArray?.length - 1 && !allModulesCompleted) {
      return '/dashboard?allModulesNotCompleted=true'
    } 

    return `/module/${nextModule}`
  }

  const getFirstIncompletedModuleInTree = () => {
    const tree = myData?.progressData?.customPath || {};
    let nodeName = traverseCustomPathTree(tree, lessonModule)
    return nodeName?.replace('-', '.')
  }

  const completedModulesByName = myData?.progressData?.completedModules?.map(({ lessonModule }) => lessonModule)
  const currentModuleIsCompleted = completedModulesByName?.includes(lessonModule)
  
  return (
    mode === EXAM
      ? <Box padding="0" gap="lg" className="w-full place-items-center min-h-screen pt-20">
          {isCompleted
            ? <ExamCompleted lessonModule={lessonModule} getFirstIncompletedModuleInTree={getFirstIncompletedModuleInTree} getNextModuleUrl={getNextModuleUrl} myData={myData} resetExam={resetExam} numberOfCorrectAnswers={numberOfCorrectAnswers} numberOfQuestions={questions?.length}/>
            : <ExamQuestion invokeNextQuestion={invokeNextQuestion} incrementCorrectAnswers={incrementCorrectAnswers} question={question}/>
          }
          <Box padding="0" className="w-full sm:grid-cols-2">
            <Box padding="0" className="justify-self-stretch sm:justify-self-start self-end">
              <Button label="Go back to video" onClick={() => {setMode(LEARN)} }/>
            </Box>
            {currentModuleIsCompleted &&
              <Box padding="0" className="justify-self-stretch sm:justify-self-end self-end">
                <Button label="Skip module" onClick={() => router.push(getNextModuleUrl())}/>
              </Box>
            }
          </Box>
        </Box>
      : <>
          <Overlay visibility={showLoginWarning} toggleVisibility={setShowLoginWarning}>
            <Box padding="0" className="max-w-[300px]">
              <Heading type="h4" data-cy="video-login-warning" fontSizeClass="h4">Hey there, just letting you know that you're not logged in! You don't need to log in to go through the modules but you won't be able to save your progress!</Heading>
              <LoginForm defaultIsRegistering={false} toggleVisibility={setShowLoginWarning}/>
            </Box>
          </Overlay>
          <LearnView video={video} setMode={setMode} />
        </>
  )
}