import { createChatBotMessage } from 'react-chatbot-kit'
import Options from '../../components/molecules/Options'
import ExperienceCards from '../../components/organisms/ExperienceCards'
import ProjectCards from '../../components/organisms/ProjectCards'
import SkillCards from '../../components/organisms/SkillCards'
import BlogCards from '../../components/organisms/BlogCards'
import IConfig from 'react-chatbot-kit/build/src/interfaces/IConfig'

const getMoodOptions = (actionProvider: any) => {
  return [
    {
      text: 'Get contacts',
      handler: () => actionProvider.handleGoodMood(),
      id: 1
    },
    {
      text: 'Having an issue',
      handler: () => actionProvider.handleBadMood(),
      id: 2
    }
  ]
}

const getJokeOptions = (actionProvider: any) => {
  return [
    {
      text: "LOL that's funny",
      handler: () => actionProvider.handleGoodMoodFinally(),
      id: 1
    },
    {
      text: 'Tell me another one',
      handler: () => actionProvider.handleBadMoodAgain(),
      id: 2
    }
  ]
}

const getPersonalOptions = (actionProvider: any) => {
  const navigateToUrl = () => {
    window.open('/apps/chat', '_self')
  }
  return [
    {
      text: 'Facility Manager',
      handler: () => {
        actionProvider.handleExperience(), navigateToUrl()
      },
      id: 1
    },
    {
      text: 'Other',
      handler: () => {
        actionProvider.handleProjects(), navigateToUrl()
      },
      id: 2
    }
    // {
    //   text: 'Skills',
    //   handler: () => actionProvider.handleSkills(),
    //   id: 3
    // },
    // {
    //   text: 'Blogs',
    //   handler: () => actionProvider.handleBlogs(),
    //   id: 4
    // }
  ]
}

const config: IConfig = {
  botName: 'Jeffrey Yu',
  initialMessages: [
    createChatBotMessage("Hi, I'm your assistant, how can I help you today ?", {
      widget: 'moodOptions'
    })
  ],
  // customStyles: {
  //   botMessageBox: {
  //     backgroundColor: '#147efb',
  //   },
  //   chatButton: {
  //     backgroundColor: '#147efb',
  //   },
  // },
  widgets: [
    {
      widgetName: 'moodOptions',
      widgetFunc: (props: any) => (
        <Options {...props} options={getMoodOptions(props.actionProvider)} getOptions={getMoodOptions} />
      ),
      mapStateToProps: ['moodOptions'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'jokeOptions',
      widgetFunc: (props: any) => (
        <Options {...props} options={getJokeOptions(props.actionProvider)} getOptions={getJokeOptions} />
      ),
      mapStateToProps: ['jokeOptions'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'personalOptions',
      widgetFunc: (props: any) => (
        <Options {...props} options={getPersonalOptions(props.actionProvider)} getOptions={getPersonalOptions} />
      ),
      mapStateToProps: ['personalOptions'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'experience',
      widgetFunc: (props: any) => <ExperienceCards {...props} />,
      mapStateToProps: ['experience'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'projects',
      widgetFunc: (props: any) => <ProjectCards {...props} />,
      mapStateToProps: ['projects'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'skills',
      widgetFunc: (props: any) => <SkillCards {...props} />,
      mapStateToProps: ['skills'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    },
    {
      widgetName: 'blogs',
      widgetFunc: (props: any) => <BlogCards {...props} />,
      mapStateToProps: ['blogs'],
      props: {
        skills: [
          {
            name: 'React',
            level: '90%'
          },

          {
            name: 'Node.js',
            level: '80%'
          }
        ]
      }
    }
  ]
}

export default config
