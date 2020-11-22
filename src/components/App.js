import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
      
      this.setState({
        filters: {
          type: event.target.value
        }
      })
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type
    let api = (type === "all") ? "/api/pets" : `/api/pets?type=${type}`
      
    
    
    fetch(api)
    .then(resp => resp.json())
    .then(
      pets => this.setState({
        pets
    })
    )
  }

  onAdoptPet = (clickedId) => {
    

    // const { pets } = this.state

    const updatedPet = this.state.pets.map(pet => {
      if (clickedId === pet.id){
        return {
          ...pet, 
          isAdopted: true
        }
      } else {
        return pet
      }
    })
        this.setState({
          pets: updatedPet
        })
  }

 


  render() {
    return (
  
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = { this.onChangeType }
              onFindPetsClick = { this.onFindPetsClick } 
               />
            </div>
            <div className="twelve wide column">
              <PetBrowser {...this.state} 
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
