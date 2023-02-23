import fs from 'node:fs';
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
import prompts from 'prompts';
import {
  // blue,
  cyan,
  green,
  // lightGreen,
  // lightRed,
  magenta,
  red,
  reset,
  yellow,
} from 'kolorist';

const FRAMEWORKS = [
  {
    name: 'base',
    display: '空白页',
    color: yellow,
  },
  {
    name: 'form',
    display: '基础表单模板',
    color: green,
  },
  {
    name: 'dialog',
    display: '弹窗表单模板',
    color: cyan,
  },
  {
    name: 'agreement',
    display: '协议页模板',
    color: magenta,
  },
];

const RENDERFUNC = [
  {
    name: 'ssr',
    display: 'SSR',
    color: yellow,
  },
  {
    name: 'csr',
    display: 'CSR',
    color: green,
  },
];


const init = async () => {
  let result;
  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: reset('请输入模块名称:'),
          initial: 'demo',
        },
        {
          type: 'select',
          name: 'framework',
          message: reset('请选择为你所需要创建的模块选择一个模板：'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color;
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework.name,
            };
          }),
        },
        {
          type: 'select',
          name: 'renderType',
          message: reset('请选择渲染方式：'),
          initial: 0,
          choices: RENDERFUNC.map((item) => {
            const { color } = item;
            return {
              title: color(item.display || item.name),
              value: item.name,
            };
          }),
        },
      ],
      {
        onCancel: (error) => {
          console.error(error);
          throw new Error(`${red('✖')} Operation cancelled`);
        },
      },
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  const { framework, projectName, renderType } = result;
  const upperProjectName = projectName.slice(0, 1).toUpperCase() + projectName.slice(1)
  console.log(`模块名：${projectName}`, '选择的模板为：', framework, '渲染方式为：', renderType);

  updatePinia(projectName, upperProjectName, framework);
  updatePage(projectName, upperProjectName, framework);
};

init().catch((e) => {
  console.error(e);
});

const updatePinia = (projectName, upperProjectName, framework) => {
  const piniaPath = './web/pinia-store';
  const func = `use${upperProjectName}Store`;

  let moduleFileContent = fs.readFileSync(`./_templates/${framework}/pinia_modules_template.ts`, 'utf-8');
  moduleFileContent = moduleFileContent.replaceAll('$upperProjectName', upperProjectName);
  moduleFileContent = moduleFileContent.replaceAll('$projectName', projectName);
  createFile(`${piniaPath}/modules`, `${projectName}.ts`, moduleFileContent);

  editFile(
    `${piniaPath}/index.ts`, 
    content => content.replaceAll(
      '// import',
      `import { ${func} } from './modules/${projectName}';
// import`,
    )
  );
  editFile(
    `${piniaPath}/index.ts`, 
    content => content.replaceAll('// export', `${func},
  // export`),
  );
}


const updatePage = (projectName, upperProjectName, framework) => {
  const pagesPath = './web/pages';

  let fetchContent = fs.readFileSync(`./_templates/${framework}/pages_fetch.ts`, 'utf-8');
  fetchContent = fetchContent.replaceAll('$upperProjectName', upperProjectName);
  fetchContent = fetchContent.replaceAll('$projectName', projectName);
  createFile(`${pagesPath}/${projectName}`, 'fetch.ts', fetchContent);
  console.log('fetchcontent', fetchContent);

  let renderContent = fs.readFileSync(`./_templates/${framework}/pages_render.vue`, 'utf-8');
  renderContent = renderContent.replaceAll('$upperProjectName', upperProjectName);
  renderContent = renderContent.replaceAll('$projectName', projectName);

  createFile(`${pagesPath}/${projectName}`, 'render.vue', renderContent);
  console.log('fetchcontent', renderContent);

};

/**
 * 
 * @param {string} file 
 * @param {(content: string) => string} callback 
 */
const editFile = (file, callback) => {
  const content = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(file, callback(content), 'utf-8');
};

const createFile = (dirName, fileName, content) => {
  fs.mkdir(`${dirName}`, (err) => {
    if (!err) {
      console.log(dirName, ' created!');
    } else {
      console.log(err);
    }
    fs.writeFile(`${dirName}/${fileName}`, content, (err) => {
      console.log(err);
    });
  });
};
