import React from 'react';
import { ProjectForm } from '../ProjectForm/ProjectForm';
import { ActionContainer } from '../ActionContainer/ActionContainer';
import { PaletteForm } from '../PaletteForm/PaletteForm';
import './Main.scss';
// import PropTypes from 'prop-types';

export const Main = ({ randomizeColors, projects, palettes, trackCurrentProject, currentProjectId, trackCurrentPalette }) => {
  return (
    <section className="main-section"> 
    <ProjectForm projects={projects} trackCurrentProject={trackCurrentProject}/>
    <ActionContainer randomizeColors={randomizeColors}/>
    <PaletteForm palettes={palettes} currentProjectId={currentProjectId} trackCurrentPalette={trackCurrentPalette}/>
    </section>
  )
}

export default Main;