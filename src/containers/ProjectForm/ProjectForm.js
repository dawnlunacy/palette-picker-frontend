import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './ProjectForm.scss'

export class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: '',
      currentProjectName: '',
      error: '',
    }
  }

  handleInputChange = async (e) => {
    this.setState({error: ''})
    this.setState({ currentProjectName: e.target.value})
    await this.setState({ [e.target.name]: e.target.value })
    let { trackCurrentProject } = this.props;
    trackCurrentProject(this.state.currentProject)
  }

  handleDropDownChange = async (e) => {
    this.setState({ currentProjectName: e.target.options[e.target.options.selectedIndex].text})
    await this.setState({ currentProject: e.target.value})
    let { trackCurrentProject } = this.props;
    trackCurrentProject(this.state.currentProject)
  }


  render() {
    let { projects  } = this.props;
    let projectNames = projects.map(currentProject => {
      return <option value={currentProject.id} id={currentProject.project_name} key={currentProject.id}> {currentProject.project_name}  </option>
    })

    return (
      <section className="project-details">
        <form className="project-form">
        <input 
          type="text" 
          name="currentProject" 
          placeholder="Enter New Project Name" 
          value = {this.state.name}
          onChange = {this.handleInputChange}
          />
        </form>
        <select className="project-select" onChange={(event) => this.handleDropDownChange(event)}>
          <option value="Project Name"> Select existing Project </option>
          { projectNames }
        </select>
        <NavLink to='/projects' className='view-all-projects-btn'>View All Projects</NavLink>
        <p className="current-project"> {this.state.currentProjectName} </p>
      </section>
    )
  }
}


export default ProjectForm;