import React, { useState } from 'react';

import {
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';

import {Calendar} from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import styles from './Styles';
import * as Constants from './Constants';

import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import  {showMessage, hideMessage} from "react-native-flash-message";
import SelectDropdown from 'react-native-select-dropdown';

export const HomeScreen = ( { navigation }) => {
    return (
      <View style={{backgroundColor: '#90EE90',flex:1}}>
      <ScrollView style={{backgroundColor: '#90EE90', flex: 1,  paddingBottom:540}}>
        
      <View style={styles.topbar}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Veggie Eaters')}>
        <FontAwesome name="md-arrow-back" size={25}/>
        </Pressable>
      </View>
  
  
      <View style={{width: '100%', justifyContent: 'center', alignItems:'center', backgroundColor: '#90EE90', borderBottomColor:'#808080', borderBottomWidth:5 }}>
      <Image style={styles.circle} source={require('./assets/beautifulwoman.jpg')} />
      </View>
  
      <View>
      <Text style={styles.paragraph}>
        {Constants.Username}
      </Text>
      </View>
  
      <View style={styles.container_button1}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Veggie Eaters')}>
          <Text style={styles.text}>Veggie Eaters</Text>
        </Pressable>
      </View>
      
      <View style={styles.container_button2}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Recipes')}>
          <Text style={styles.text}>Recipes</Text>
        </Pressable>
      </View>
      <View style={styles.container_calendar}>
        <Calendar style={{flex: 1}}/>
      </View>

      </ScrollView>
      <View style={styles.container_icons}>
          <View style={{width:350}}>
            <FontAwesome name="md-home" size={30}/>
          </View>
          <View style>
            <FontAwesome name="md-help-outline" size={30}/>
          </View>
      </View>
      </View>
    )
  }

export const VeggieEaters = ( { navigation }) => {
  const veggieEaterImages = {
    arla: require('./assets/child1.jpg'),
    carlos: require('./assets/child2.jpg'),
  }

  const goToEspecificVeggieEater = (name, photoPath) => {
    Constants.SelectedVeggieEater.name = name;
    Constants.SelectedVeggieEater.veggieEaterImagePath = photoPath;
    navigation.navigate('Veggie Eater');
  }
  return (
    <View style={{backgroundColor: '#90EE90',flex:1}}>
    <ScrollView style={{backgroundColor: '#90EE90', flex: 1, paddingBottom:540}}>
      
    <View style={styles.topbar}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
      <FontAwesome name="md-arrow-back" size={25}/>
      </Pressable>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
      <FontAwesome name="md-person" size={25}/>
      </Pressable>
    </View>


    <View style={{width: '100%', justifyContent: 'center', alignItems:'center', backgroundColor: '#90EE90', borderBottomColor:'#808080', borderBottomWidth:5 }}>
    <Text style={styles.textTitle}>Veggie Eaters</Text>
    </View>

    <View style={styles.veggieEaterButtonContainer}>
      <View style={styles.container_button1}>
        <Pressable style={styles.veggieEaterButton} onPress={() => goToEspecificVeggieEater('Arla', veggieEaterImages.arla)}>
          <Image style={styles.squareVeggieEater} source={veggieEaterImages.arla} />
        </Pressable>
        <Text style={styles.veggieEaterName}>Arla</Text>
      </View>
      <View style={{width:50}}>

      </View>
      <View style={styles.container_button2}>
        <Pressable style={styles.veggieEaterButton} onPress={() => goToEspecificVeggieEater('Carlos', veggieEaterImages.carlos)}>
          <Image style={styles.squareVeggieEater} source={veggieEaterImages.carlos} />
        </Pressable>
        <Text style={styles.veggieEaterName}>Carlos</Text>
      </View>
    </View>

    <View style={styles.container_button1}>
        <Pressable style={styles.veggieEaterEditButton} onPress={() => navigation.navigate('Veggie Eaters')}>
          <Text style={styles.text}>Edit</Text>
        </Pressable>
    </View>
    </ScrollView>

    <View style={styles.container_icons}>
      <View style={{width:350}}>
        <FontAwesome name="md-home" size={30}/>
      </View>
      <View style>
        <FontAwesome name="md-help-outline" size={30}/>
      </View>
    </View>

    </View>
  )
  }

  export const VeggieEater = ( { navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [toggleCheckBoxRaw, setToggleCheckBoxRaw] = useState(false)
    const [toggleCheckBoxCooked, setToggleCheckBoxCooked] = useState(false)
    const [list, setList] = useState(Constants.VegetableList)
    const [veggieUnits, setUnits] = useState(0);
    const vegetableImages = {
      tomato: require('./assets/tomate-1.png'),
      carrot: require('./assets/carrot.png'),
      lettuce: require('./assets/lettuce.png'),
      potato: require('./assets/potato.png'),
      onion: require('./assets/cebola.png'),
      eggplant: require('./assets/eggplant.png'),

    };

    const updateVegetable = (nam, val) => {
      // Find the item to update and store it in new list 
      const op = [];
      let eli = list.map((item) => {if(item.name === nam){op.push(1)} return item});
      
      if (op.find(e => e == 1) == undefined){
        list.push({name: nam, value: val});
      }
      else {
        let el = list.map((item) => {if(item.name === nam){item.value=item.value + val} return item});
        setList(el)
      }
    };

    const addVegetable = (name, units) => {
      updateVegetable(name, parseInt(units));
      setModalOpen(false);
      showMessage({
        message: units + " units of " + name + " added sucessfully!",
        type: 'success',
      })
    }

    const openModalVegetable = (vegetableName, vegetableImagePath) => {
      Constants.SelectedVegetable.vegetableName = vegetableName;
      Constants.SelectedVegetable.vegetableImagePath = vegetableImagePath;
      setModalOpen(true);
    }

    const updateVeggieEater = () => {
      showMessage({
        message: "Updated " + Constants.SelectedVeggieEaterName + " successfully!",
        type: 'success',
      })
    }

    return (
      <View style={{backgroundColor: '#90EE90',flex:1}}>
        <View style={{height: 10}}></View>
        <View style={styles.topbar}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Veggie Eaters')}>
          <FontAwesome name="md-arrow-back" size={25}/>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <FontAwesome name="md-person" size={25}/>
          </Pressable>
        </View>
    
        <View style={styles.singleVeggieEaterContainerImage}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '100%', justifyContent: 'center', alignItems:'center', backgroundColor: '#90EE90'}}>
              <Image style={styles.circleVeggie} source={Constants.SelectedVeggieEater.veggieEaterImagePath} />
            </View>
            <Text style={{paddingTop:16, fontSize: 16}}>{Constants.SelectedVeggieEater.name}</Text>
          </View>
          <View style={{width:30}}>
          </View>
          <View style={{height: 105, flexShrink:1, borderLeftColor: 'gray', borderLeftWidth: 2, paddingLeft: 10}}>
          <FlatList data={Constants.VegetableList} renderItem={({item}) => <Text style={{fontSize: 15}}> - {item.name + ' ' +  item.value}</Text>}/>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <View style={styles.searchBarContainer}>
            <View>
              <Text style={{paddingBottom: 2, paddingTop: 2}}>Search for vegetable</Text>
            </View>
            <Searchbar containerStyle={styles.searchBarContainer} placeholder="Vegetable"
            inputStyle={{fontSize: 16}}/>
          </View>
          <View style={styles.container_VeggieEaterPageButtons}>
              <Pressable style={styles.veggieEaterPageButtons}>
                <Text style={styles.text}>Search</Text>
              </Pressable>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{paddingRight: 88, fontSize: 14, paddingTop: 5, fontWeight: 'bold'}}>OR</Text>
        </View>
        <View style={styles.container_VeggieEaterPageButtonsRecipe}>
              <Pressable style={styles.veggieEaterPageButtons} onPress={() => navigation.navigate('Veggie Eaters')}>
                <Text style={styles.text}>Add Recipe</Text>
              </Pressable>
        </View>
        <View style={{paddingTop: 30, height: 240}}>
        <Text style={{paddingLeft: 48, paddingBottom: 5}}>Pick a vegetable:</Text>
        <View style={{alignItems:'center'}}>
        <ScrollView style={{borderWidth: 2, borderColor: 'gray', width: 300, backgroundColor:'white'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width:76, alignItems:'center'}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Tomato', vegetableImages.tomato)}>
                <Image style={styles.veggetableImages} source={vegetableImages.tomato} />
              </Pressable>
              <Text>Tomato</Text>
            </View>
            <View style={{width: 34}}></View>
            <View style={{width: 73}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Carrot', vegetableImages.carrot)}>
                <Image style={styles.veggetableImages} source={vegetableImages.carrot} />
              </Pressable>
              <Text style={{paddingLeft: 18}}>Carrot</Text>
            </View>
            <View style={{width: 34}}></View>
            <View style={{width: 76}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Lettuce', vegetableImages.lettuce)}>
                <Image style={styles.veggetableImages} source={vegetableImages.lettuce} />
              </Pressable>
              <Text  style={{paddingLeft: 14}}>Lettuce</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{width:76}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Potato', vegetableImages.potato)}>
                <Image style={styles.veggetableImages} source={vegetableImages.potato} />
              </Pressable>
              <Text style={{paddingLeft: 18}}>Potato</Text>
            </View>
            <View style={{width: 34}}></View>
            <View style={{width: 76}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Onion', vegetableImages.onion)}>
                <Image style={styles.veggetableImages} source={vegetableImages.onion} />
              </Pressable>
              <Text style={{paddingLeft: 18}}>Onion</Text>
            </View>
            <View style={{width: 34}}></View>
            <View style={{width: 76}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable('Eggplant', vegetableImages.eggplant)}>
                <Image style={styles.veggetableImages} source={vegetableImages.eggplant} />
              </Pressable>
              <Text>Eggplant</Text>
            </View>
          </View>
        </ScrollView>
        </View>
      </View> 

      <Modal visible={modalOpen} transparent={true}>
        <View style={styles.modalContent}>
            <View style={styles.innerModal}>
              <Pressable onPress={() => setModalOpen(false)} style={{paddingLeft: 265}}>
                <FontAwesome name="md-close" size={25}/>
              </Pressable>
              <View style={{paddingLeft:20, flexDirection: 'row'}}>
              <Image style={styles.veggetableImage} source={Constants.SelectedVegetable.vegetableImagePath} />
              <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 52, paddingLeft: 25}}>{Constants.SelectedVegetable.vegetableName}</Text>
              </View>

              <View style={{paddingLeft: 20, flexDirection: 'row', paddingTop: 30}}>
                <Text style={{paddingTop: 20, fontSize: 16, fontWeight: 'bold', paddingRight: 15}}>Quantidade</Text>
                <TextInput
                  style={{height: 40, width: 150,margin: 12, borderWidth: 1, padding: 10, backgroundColor: '#D3D3D3'}}
                  placeholder="insere unidades"
                  keyboardType="numeric"
                  onChangeText={(text) => setUnits(text)}/>
              </View>
              <View style={{paddingLeft: 20, flexDirection: 'row', paddingTop: 0}}>
                <Text style={{paddingTop: 20, fontSize: 16, fontWeight: 'bold', paddingRight: 40}}>Estado</Text>
                <View style={{flexDirection: 'row', paddingTop: 18}}>
                  <Text style={{paddingTop: 5}}>Raw</Text>
                  <CheckBox disabled={false} value={toggleCheckBoxRaw} onValueChange={(newValue) => setToggleCheckBoxRaw(newValue)} tintColors={{ true: 'white' }}/>
                  <Text style={{paddingTop: 5, paddingLeft: 25}}>Cooked</Text>
                  <CheckBox disabled={false} value={toggleCheckBoxCooked} onValueChange={(newValue) => setToggleCheckBoxCooked(newValue)} tintColors={{ true: 'white' }}/>
                </View>
              </View>
              <View style={{paddingTop:30, paddingLeft: 90}}>
                <Pressable style={styles.buttonAddVegetable} onPress={() => addVegetable(Constants.SelectedVegetable.vegetableName,veggieUnits)}>
                  <Text style={{color: 'gray', fontSize: 14, fontWeight: 'bold'}}>Add Vegetable</Text>
                </Pressable>
              </View>
            </View>
        </View>
      </Modal>
      <FlashMessage position="center" titleStyle={{fontSize: 16}}/>

      <View style={styles.container_button1}>
        <Pressable style={styles.button} onPress={() => updateVeggieEater()}>
          <Text style={styles.text}>Update</Text>
        </Pressable>
      </View>

      <View style={styles.container_icons_singleVeggie}>
        <View style={{width:350}}>
          <FontAwesome name="md-home" size={30}/>
        </View>
        <View style>
          <FontAwesome name="md-help-outline" size={30}/>
        </View>
      </View>
      </View>
    )
  
  }

export const Recipes = ( { navigation }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const filters = ["All", "Most Recent", "Most Popular", "Most Rated", "Favourites"]
  const recipeImages = {
    pipis: require('./assets/recipe1.jpeg'),
    green_noodles: require('./assets/recipe2.jpeg')
  }
  
  const stateChange = () => {
    this.state.check === false ? this.setState({logo: 'md-heart', check: true}) : this.setState({logo: 'md-heart-outline', check: false})


  }
  return (
    <View style={{backgroundColor: '#90EE90',flex:1}}>
        
        <View style={styles.topbar}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <FontAwesome name="md-arrow-back" size={25}/>
          </Pressable>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <FontAwesome name="md-person" size={25}/>
          </Pressable>
        </View>
  
  
        <View style={{width: '100%', justifyContent: 'center', alignItems:'center', backgroundColor: '#90EE90', borderBottomColor:'#808080', borderBottomWidth:5 }}>
          <Text style={styles.textTitle}>Recipes</Text>
        </View>
  
        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <View style={styles.searchBarContainer}>
            <View>
              <Text style={{paddingBottom: 2, paddingTop: 2}}>Search for recipe</Text>
            </View>
            <Searchbar containerStyle={styles.searchBarContainer} placeholder="Recipe" inputStyle={{fontSize: 16}}/>
          </View>
          <View style={styles.container_VeggieEaterPageButtons}>
              <Pressable style={styles.veggieEaterPageButtons}>
                <Text style={styles.text}>Search</Text>
              </Pressable>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.searchBarContainer}>
            <View>
              <Text style={{paddingBottom: 2, paddingTop: 2}}>Filter recipes</Text>
            </View>
            <SelectDropdown data={filters} buttonTextStyle={{fontSize: 16}}/>
          </View>
          <View style={styles.container_VeggieEaterPageButtons}>
              <Pressable style={styles.veggieEaterPageButtons}>
                <Text style={styles.text}>Filter</Text>
              </Pressable>
          </View>
        </View>

        <View style={{paddingLeft: 50, paddingTop: 30}}>
          <Text>Pick a Recipe:</Text>
          <View style={{height: 270}}>
          <ScrollView>
            <View style={{paddingTop: 10}}>
              <Pressable style={styles.recipesButton} onPress={() => setModalOpen(true)}>
                <View style={{flexDirection: 'row'}}>
                <Image style={styles.recipeImage} source={recipeImages.pipis} />
                <Text style={{flexShrink:1, paddingLeft: 5}}>Pipis in spicy broth{'\n'}{'\n'}Make the most of tomatoes with this summer pipi dish. {'\n'}{'\n'}Time to Cook: 30 minutes</Text>
                </View>
              </Pressable>
            </View>
            <View style={{paddingTop: 15}}>
              <Pressable style={styles.recipesButton}>
                <View style={{flexDirection: 'row'}}>
                <Image style={styles.recipeImage} source={recipeImages.green_noodles} />
                <Text style={{flexShrink:1, paddingLeft: 5}}>Green Tea Noddles with sticky salmon{'\n'}Bring a pop of colour to this easy midweek dinner.{'\n'}{'\n'}Time to Cook: 30 minutos</Text>
                </View>
              </Pressable>
            </View>
            <View style={{paddingTop: 15}}>
              <Pressable style={styles.recipesButton}>
                <View style={{flexDirection: 'row'}}>
                <Image style={styles.recipeImage} source={recipeImages.green_noodles} />
                <Text style={{flexShrink:1, paddingLeft: 5}}>Green Tea Noddles with sticky salmon{'\n'}Bring a pop of colour to this easy midweek dinner.{'\n'}{'\n'}Time to Cook: 30 minutos</Text>
                </View>
              </Pressable>
            </View>
            <View style={{paddingTop: 15}}>
              <Pressable style={styles.recipesButton}>
                <View style={{flexDirection: 'row'}}>
                <Image style={styles.recipeImage} source={recipeImages.green_noodles} />
                <Text style={{flexShrink:1, paddingLeft: 5}}>Green Tea Noddles with sticky salmon{'\n'}Bring a pop of colour to this easy midweek dinner.{'\n'}{'\n'}Time to Cook: 30 minutos</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
          </View>
        </View>

      <Modal visible={modalOpen} transparent={true}>
        <View style={styles.modalContentRecipe}>
            <View style={styles.innerModalRecipe}>
              <View style={{flexDirection:'row'}}>
                <Pressable style={{paddingTop:5, paddingLeft:5}}>
                  <FontAwesome name="md-heart-outline" size={25} color='gray' invisible={true} check />
                </Pressable>
                <Pressable onPress={() => setModalOpen(false)} style={{paddingLeft: 290, paddingTop: 5}}>
                  <FontAwesome name="md-close" size={25}/>
                </Pressable>
              </View>
              <View style={{alignItems: 'center'}}>
              <Image style={styles.recipeFullImage} source={recipeImages.green_noodles} />
              </View>
              <View style={{alignItems: 'center', paddingTop: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Green Tea Noodles</Text>
                <Text>Difficulty: Easy | 30 minutes</Text>
              </View>
              <View style={{height: 200}}>
                <ScrollView>
                <View style={{paddingTop: 15, paddingLeft: 15}}>
                  <Text>
                    1. Preheat oven to 220°C. Heat peanut oil in a small saucepan over low heat. Add ginger, long green shallot, lemongrass and a pinch of salt. Cook, stirring occasionally, for 6-8 minutes until long green shallot is very soft but not coloured. Remove from heat and cool.{'\n'}
                    2. Meanwhile, combine honey, olive oil and chilli paste in a bowl. Stir to combine. Line a baking tray with baking paper and add salmon. Rub honey mixture over salmon to coat, then season. Roast for 12-15 minutes for medium. Set aside, loosely covered with foil, to rest for 5 minutes.{'\n'}
                    3. Cook noodles according to packet instructions. Drain and rinse briefly with warm water.{'\n'}
                    4. Whisk lime juice, sugar, fish sauce and chilli flakes into the shallot oil mixture. Place noodles in a large bowl with three quarters of the shallot oil, season and toss to combine. Arrange on a serving platter and flake salmon over the top. Drizzle over remaining shallot oil and scatter with extra chilli flakes, toasted sesame seeds and shiso leaves. Serve at room temperature or chilled.
                  </Text>
                </View>
                </ScrollView>
              </View>
              
            </View>
        </View>
      </Modal>

      <View style={styles.container_icons}>
        <View style={{width:350}}>
          <FontAwesome name="md-home" size={30}/>
        </View>
        <View style>
          <FontAwesome name="md-help-outline" size={30}/>
        </View>
      </View>
  
    </View>
  )
}