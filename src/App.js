import React, { Component } from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import { Header } from '../src/containers/Header/Header';
import { Main } from '../src/containers/Main/Main';
import { ColorContainer } from '../src/containers/ColorContainer/ColorContainer';
import { ProjectsContainer } from './containers/ProjectsContainer/ProjectsContainer'
import { fetchData } from './utils/apiCalls';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: 2,
      projects: [],
      palettes: [],
      currentProject: '',
      currentPalette: '',
      colors: [],
      errorMessage: ''
    }
  }

  async componentDidMount() {
    this.randomizeColors()
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL + '/'
      const defaultUserProjectsUrl = 'api/v1/2/projects';
      const defaultUserProjects = await fetchData(`${baseUrl}${defaultUserProjectsUrl}`)
      this.setState({ projects: defaultUserProjects })
      this.fetchHelper()
    } catch(error) {
      this.setState({errorMessage: error})
    }
  }

 fetchHelper = async () => {
    let palettes = this.state.projects.map(async (project) => {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/2/projects/${project.id}/palettes`
      let info = await fetchData(url)
      return info
    })
    this.setState({ palettes: await Promise.all(palettes)})  
  }

  randomizeColors = () => {
    let colors = [];
    if (this.state.colors.length === 0) {
      while (colors.length < 5) {
        let randomColor = '#000000'.replace(/0/g, () => {
          return (~~(Math.random()*16)).toString(16)
        })
        colors.push({ color: randomColor, isLocked: false })
      }
      this.setState({ colors })
    } else {
      let newColors = this.state.colors.map(color => {
        if (color.isLocked === false) {
          let randomColor = '#000000'.replace(/0/g, () => {
                return (~~(Math.random()*16)).toString(16)
              })
            return { color: randomColor, isLocked: false };
        } else {
          return color;
        }
      })
      this.setState({ colors: newColors })
    }
  }

  toggleLock = (e) => {
    if (e.target.className === 'lock-icon') {
      const target = e.target.nextElementSibling.innerText;
      const cards = this.state.colors.map(color => {
        if (color.color === target.toLowerCase()) {
          return {color: color.color, isLocked: !color.isLocked};
        }
        return color;
      });
      this.setState({ colors: cards })
    }
  }

  deleteProject = (e) => {
    if (e.target.id === 'project') {
      console.log('project')
    }
  }

  deletePalette = (e) => {
    if (e.target.id === 'palette') {
      console.log('palette')
    }
  }

  trackCurrentProject = (currentProject) => {
    this.setState({ currentProject })
  }

  trackCurrentPalette = (currentPalette) => {
    this.setState({ currentPalette })
    let currentSelectedPalette = this.state.palettes.flat().find(palette => {
      console.log("palette", palette)
      return palette.palette_name === currentPalette && palette.project_id === parseInt(this.state.currentProject)
    })
    let rawKeys = Object.keys(currentSelectedPalette)
    let colorKeys = [...rawKeys].filter(key => key.includes('color'))
    let currentPaletteColors = colorKeys.reduce((acc, currKey) => {
      let color = {
        [currKey]: currentSelectedPalette[currKey],
        isLocked: false
      }
      acc.push(color)
      return acc
    }, [])
    console.log("currrr", currentSelectedPalette)
    console.log("rawKeys", rawKeys)
    console.log("colorkeys", colorKeys)
    console.log("MAGIK", currentPaletteColors)
    // this.setState({ colors: currentPaletteColors })
  }

  render() {
    console.log("STATE APP:", this.state)
    const { colors } = this.state
    return (
      <div>
        <Route exact path='/' render={() => 
          <>
            <Header />
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
            <Main 
              randomizeColors={this.randomizeColors} 
              projects={this.state.projects} 
              palettes={this.state.palettes} 
              trackCurrentProject={this.trackCurrentProject}
              currentProjectId={this.state.currentProject}
              trackCurrentPalette={this.trackCurrentPalette}
              />
            <ColorContainer colors={colors} toggleLock={this.toggleLock} />
          </>
        } />
        <Route path='/projects' render={() => 
          <>
            <Header />
            <ProjectsContainer deleteProject={this.deleteProject} deletePalette={this.deletePalette}/>
          </>
        } />
      </div>
    )
  }
} 

export default App;

 // Component.propTypes = {
  //   prop1: PropTypes.array.isRequired,
  //   prop2: PropTypes.any,
  //   prop3: PropTypes.func.isRequired,
  //   prop4: PropTypes.bool,
  //   prop5: PropTypes.string.isRequired,
  //   prop6: PropTypes.number
  // }