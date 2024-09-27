import type { RawTree } from "@/graphql/queries/learningPaths";
import type { VideoType } from "@/graphql/queries/videos";
import type { ProgressData } from "@/graphql/queries/myData";

type Tree = {
  name: string;
  children: Tree[];
  isCompleted: boolean;
}

export const buildLinearTree = (availableModules: { attributes: VideoType }[] = [], userData: ProgressData = {}): RawTree => {
  const completedModules = userData?.completedModules || [];
  const tree: Tree = {
    name: 'Your steps to success',
    children: [],
    isCompleted: false,
  };

  let currentLevel = tree.children;
  availableModules.forEach(module => {
    const { lessonModule } = module.attributes;

    if (lessonModule) {
      currentLevel.push({
        name: lessonModule.toString(),
        isCompleted: completedModules.filter(({ lessonModule: lm }) => lm == lessonModule)?.length > 0,
        children: []
      });
      currentLevel = currentLevel[0].children;
    }
  });

  return tree;
}

// use this when rawTree is already available
export const formatTree = (rawTree: RawTree, userData: ProgressData = {}): RawTree => {
  const completedModules = userData?.completedModules || [];

  const traverse = (node) => {
    if (node.children) {
      node.children.forEach(child => {
        traverse(child);
      });
    }

    if (node.name) {
      node.isCompleted = completedModules.filter(({ lessonModule: lm }) => lm == node.name)?.length > 0
    }
  }

  traverse(JSON.parse(JSON.stringify(rawTree)));
  return rawTree;
}