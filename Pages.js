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

  const goToEspecificVeggieEater = (name, photoPath, veggieList) => {
    Constants.SelectedVeggieEater.name = name;
    Constants.SelectedVeggieEater.veggieEaterImagePath = photoPath;
    Constants.SelectedVeggieEater.VegetableList = veggieList;
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
        <Pressable style={styles.veggieEaterButton} onPress={() => goToEspecificVeggieEater('Arla', veggieEaterImages.arla, Constants.VegetableListArla)}>
          <Image style={styles.squareVeggieEater} source={veggieEaterImages.arla} />
        </Pressable>
        <Text style={styles.veggieEaterName}>Arla</Text>
      </View>
      <View style={{width:50}}>

      </View>
      <View style={styles.container_button2}>
        <Pressable style={styles.veggieEaterButton} onPress={() => goToEspecificVeggieEater('Carlos', veggieEaterImages.carlos, Constants.VegetableListCarlos)}>
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
    const [toggleCheckBoxRaw, setToggleCheckBoxRaw] = useState(false);
    const [toggleCheckBoxCooked, setToggleCheckBoxCooked] = useState(false);
    const [list, setList] = useState(Constants.SelectedVeggieEater.VegetableList);
    const [veggieUnits, setUnits] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalRecipeOpen, setModalRecipeOpen] = useState(false);
    
    const vegetableImages = {
      tomato: require('./assets/tomate-1.png'),
      carrot: require('./assets/carrot.png'),
      lettuce: require('./assets/lettuce.png'),
      potato: require('./assets/potato.png'),
      onion: require('./assets/cebola.png'),
      eggplant: require('./assets/eggplant.png'),

    };

    const recipeImages = {
      pipis: require('./assets/recipe1.jpeg'),
      green_noodes: require('./assets/recipe2.jpeg'),
    };

    const recipeIngredients = {
      pipis: [{name: "Eschalot", quantity: 4}, {name: "Garlic", quantity: 4}, {name: "Tomato", quantity: 5}, ],
      green_noodes: [{name: "Shallot", quantity: 3}, {name: "Lemongrass", quantity: 1}, {name: "Chilli", quantity: 5}],
    }

    const vegetableNames = {
      tomato: "Tomato",
      carrot: "Carrot",
      lettuce: "Lettuce",
      potato: "Potato",
      onion: "Onion",
      eggplant: "Eggplant",
    };

    const vegetables = [
      {name: vegetableNames.tomato, imagePath: vegetableImages.tomato},
      {name: vegetableNames.carrot, imagePath: vegetableImages.carrot},
      {name: vegetableNames.lettuce, imagePath: vegetableImages.lettuce},
      {name: vegetableNames.potato, imagePath: vegetableImages.potato},
      {name: vegetableNames.onion, imagePath: vegetableImages.onion},
      {name: vegetableNames.eggplant, imagePath: vegetableImages.eggplant},
    ];

    const recipesFavoritas = [
      {name: 'Pipis in spicy broth', imagePath: recipeImages.pipis},
      {name: 'Green Tea Noodles with sticky', imagePath: recipeImages.green_noodes},
    ];

    const [selectedVeggies, setSelectedVeggies] = useState(vegetables);

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

    const onChangeSearch  = query => {
      setSearchQuery(query);
      if (searchQuery == ''){
        setSelectedVeggies(vegetables);
        let newList = [];
        vegetables.map((item) => {if((item.name.toLowerCase()).includes(searchQuery.toLowerCase())){newList.push(item)}});
        setSelectedVeggies(newList);
      }
      else {
        setSelectedVeggies(vegetables);
      }
    }
      

    const onSearchVeggie = () => {
      let newList = [];
      vegetables.map((item) => {if((item.name.toLowerCase()).includes(searchQuery.toLowerCase())){newList.push(item)}});
      setSelectedVeggies(newList);
    }
    
    const openRecipeModal = () => {
      setModalRecipeOpen(true);
    }
    const addRecipe = (recipeName) => {
      switch(recipeName){
        case "Pipis in spicy broth":
          recipeIngredients.pipis.map((item) => {addVegetable(item.name, item.quantity)});
        case "Green Tea Noodles with sticky":
          recipeIngredients.green_noodes.map((item) => {addVegetable(item.name, item.quantity)});
      }
      setModalRecipeOpen(false);
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
          <FlatList data={list} renderItem={({item}) => <Text style={{fontSize: 15}}> - {item.name + ' ' +  item.value}</Text>}/>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingTop: 6}}>
          <View style={styles.searchBarContainer}>
            <View>
              <Text style={{paddingBottom: 2, paddingTop: 25}}>Search for vegetable</Text>
            </View>
            <Searchbar containerStyle={styles.searchBarContainer} placeholder="Vegetable"
            inputStyle={{fontSize: 16}} onIconPress={onSearchVeggie} onChangeText={onChangeSearch} value={searchQuery}/>
          </View>
          <View style={styles.container_VeggieEaterPageButtons}>
              <Pressable style={styles.veggieEaterPageButtons} onPress={() => onSearchVeggie()}>
                <Text style={styles.text}>Search</Text>
              </Pressable>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{paddingRight: 88, fontSize: 14, paddingTop: 5, fontWeight: 'bold'}}>OR</Text>
        </View>
        <View style={styles.container_VeggieEaterPageButtonsRecipe}>
              <Pressable style={styles.veggieEaterPageButtons} onPress={() => openRecipeModal()}>
                <Text style={styles.text}>Add Recipe</Text>
              </Pressable>
        </View>
        <View style={{paddingTop: 30, height: 240}}>
        <Text style={{paddingLeft: 48, paddingBottom: 5}}>Pick a vegetable:</Text>
        <View style={{alignItems: 'center'}}>
        <View style={{borderWidth: 2, borderColor: 'gray', width: 300, backgroundColor:'white', alignItems:'center', height: 200}}>
        <FlatList data={selectedVeggies} numColumns={3} contentContainerStyle={styles.list} renderItem={({item}) => <View style={{width:76, alignItems:'center'}}>
              <Pressable style={styles.veggetableButton} onPress={() => openModalVegetable(item.name, item.imagePath)}>
                <Image style={styles.veggetableImages} source={item.imagePath} />
              </Pressable>
              <Text>{item.name}</Text>
            </View>}
        />
        </View>
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
      <Modal visible={modalRecipeOpen} transparent={true}>
        <View style={styles.modalContent}>
            <View style={styles.innerModal}>
              <Pressable onPress={() => setModalRecipeOpen(false)} style={{paddingLeft: 265}}>
                <FontAwesome name="md-close" size={25}/>
              </Pressable>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20}}>Favourite Recipes</Text>
              </View>
              <View style={{borderWidth: 2, borderColor: 'gray', width: 300, height: 300}}>
                <FlatList data={recipesFavoritas} renderItem={({item}) => <View style={{paddingTop: 15}}>
                <View style={{flexDirection: 'row', paddingLeft: 20}}>
                  <Image style={styles.recipeImage} source={item.imagePath} />
                  <Text style={{width: 130,paddingLeft: 5, color: 'white'}}>{item.name}</Text>
                  <Pressable style={{paddingTop: 40}} onPress={() => addRecipe(item.name)}>
                    <FontAwesome name="md-add-circle-outline" size={25}/>
                  </Pressable>
                </View>
            </View>}
        />
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

  const recipeTitles = {
    pipis: 'Pipis in spicy broth',
    green_noodes: 'Green Tea Noodles with sicky salmon',
    sesame_beef: 'Sesame beef with gochujang udon noodles',
  }
  const recipeImages = {
    pipis: require('./assets/recipe1.jpeg'),
    green_noodles: require('./assets/recipe2.jpeg'),
    sesame_beef: require('./assets/recipe3.jpeg')
  }

  const recipesDescriptions = {
    pipis: 'Pipis in spicy broth\n\nMake the most of tomatoes with this summer pipi dish.',
    green_noodes: 'Green Tea Noddles with sticky salmon\n\nBring a pop of colour to this easy midweek dinner.',
    sesame_beef: 'Sesame beef with gochujang udon noodles\n\nMove over 2-minute noodles, this beef and udon dish will make your evening.',
  }

  const recipesContent = {
    pipis: "Ingredients:\n - 1/3 cup (80ml) vegetable oil\n - 4 eschalots, thinly sliced\n - 4 garlic cloves, thinly sliced\n - 1 lemongrass stalk, halved and bruised\n - 2 kaffir lime leaves\n - 5cm piece (25g) ginger, thinly sliced\n - 5cm piece (25g) galangal, finely grated\n - 1/2 bunch coriander, stems finely chopped, leaves picked and finely chopped\n - 1 long red chilli, finely chopped, plus extra to serve\n - 2 tbs fish sauce\n - 2 tbs sambal oelek\n - 500g ripe tomatoes, finely chopped\n - 200g grape tomatoes\n - 1kg pot-ready pipis, purged\n - Lime wedges, to serve \n\nMethod:\n1. Heat oil in a wok over high heat. Add eschalot, garlic, lemongrass, lime leaves, ginger, galangal, coriander stems and chilli, and cook for 5-6 minutes or until caramelised and fragrant. Add fish sauce, sambal oelek and tomatoes, and cook for 6-8 minutes until softened and juicy. Add the pipis, cover with a lid and cook for 6-7 minutes until the pipis have opened. Discard any unopened pipis. Serve topped with extra chilli, coriander leaves and lime wedges.",
    green_noodles: "Ingredients:\n - 1/2 cup (125ml) peanut oil\n - 1 tbs finely chopped ginger\n - 3 long green shallots, thinly sliced\n - 1 lemongrass stalk (white part only), finely grated\n - 1 1/2 tbs runny honey\n - 2 tbs extra virgin olive oil\n - 80g chilli paste in soybean oil\n - 600g whole skinless salmon fillet, pin-boned\n - 240g packet dried green tea noodles\n - 1/3 cup (80ml) lime juice\n - 2 1/2 tsp caster sugar\n - 2 tsp fish sauce\n - 1/2 tsp chilli flakes, plus extra to serve\n\nMethod:\n1. Preheat oven to 220°C. Heat peanut oil in a small saucepan over low heat. Add ginger, long green shallot, lemongrass and a pinch of salt. Cook, stirring occasionally, for 6-8 minutes until long green shallot is very soft but not coloured. Remove from heat and cool.\n2. Meanwhile, combine honey, olive oil and chilli paste in a bowl. Stir to combine. Line a baking tray with baking paper and add salmon. Rub honey mixture over salmon to coat, then season. Roast for 12-15 minutes for medium. Set aside, loosely covered with foil, to rest for 5 minutes.\n3. Cook noodles according to packet instructions. Drain and rinse briefly with warm water.\n4. Whisk lime juice, sugar, fish sauce and chilli flakes into the shallot oil mixture. Place noodles in a large bowl with three quarters of the shallot oil, season and toss to combine. Arrange on a serving platter and flake salmon over the top. Drizzle over remaining shallot oil and scatter with extra chilli flakes, toasted sesame seeds and shiso leaves. Serve at room temperature or chilled.",
    sesame_beef: "Ingredients:\n - 400g skirt beef steak\n - 2 tsp sesame oil\n - 400g udon noodles\n - 50g unsalted butter, chopped\n - 150g mixed Asian mushrooms, sliced\n - 1/4 cup gochujang (Korean fermented chilli paste)\n - 1 tbs tomato sauce\n - 120g baby spinach leaves\n - 1 bunch broccolini, cut in half on the diagonal, blanched\n - Chopped nori & toasted sesame seeds, to serve\n\nMethod:\n1. Place the skirt steak on a large oven tray, season with salt flakes and drizzle with the sesame oil. Leave steak to stand at room temperature for 30 minutes or until the fridge chill has gone.\n2.Cook the udon noodles according to packet instructions, reserving 1 cup (250ml) of noodle water.\n3.Heat a lightly greased barbecue or chargrill pan over high heat. Grill the steak for 3-4 minutes on each side until cooked to your liking. Remove from the heat and rest, loosely covered with foil, for 10-12 minutes.\n4.Meanwhile, heat half the butter in a large non-stick frypan over medium-high heat. Add the mushroom and cook for 2-3 minutes until golden. Remove and set aside. Add the gochujang and tomato sauce to the pan and cook, stirring, for 1-2 minutes until the gochujang is lightly caramelised. Add the noodle water and bring to a simmer, cooking for 2-3 minutes until the liquid is slightly reduced.\n5.Add the noodles, spinach and remaining butter, and stir until spinach is wilted and noodles are coated in the sauce.\n6.Divide noodles among serving plates, top with sliced steak, broccolini, mushroom and nori. Sprinkle with sesame seeds to serve.",
  }
  
  const RecipesList = [
    {recipeName: recipeTitles.pipis, recipeImagePath: recipeImages.pipis, recipeDescription: recipesDescriptions.pipis, recipeContent: recipesContent.pipis},
    {recipeName: recipeTitles.green_noodes, recipeImagePath: recipeImages.green_noodles, recipeDescription: recipesDescriptions.green_noodes, recipeContent: recipesContent.green_noodles},
    {recipeName: recipeTitles.sesame_beef, recipeImagePath: recipeImages.sesame_beef, recipeDescription: recipesDescriptions.sesame_beef, recipeContent: recipesContent.sesame_beef},
    {recipeName: recipeTitles.pipis, recipeImagePath: recipeImages.pipis, recipeDescription: recipesDescriptions.pipis, recipeContent: recipesContent.pipis},
    {recipeName: recipeTitles.green_noodes, recipeImagePath: recipeImages.green_noodles, recipeDescription: recipesDescriptions.green_noodes, recipeContent: recipesContent.green_noodles},
    {recipeName: recipeTitles.sesame_beef, recipeImagePath: recipeImages.sesame_beef, recipeDescription: recipesDescriptions.sesame_beef, recipeContent: recipesContent.sesame_beef}];

  const SelectedRecipesList = [];


  const openModalRecipe = (recipeName, recipeImagePath, recipeContent) => {
    Constants.SelectedRecipe.recipeName = recipeName;
    Constants.SelectedRecipe.recipeImagePath = recipeImagePath;
    Constants.SelectedRecipe.recipeContent = recipeContent;
    setModalOpen(true);
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
          <FlatList data={RecipesList} renderItem={({item}) => <View style={{paddingTop: 15}}>
                <View style={{flexDirection: 'row'}}>
                <Pressable style={styles.recipesButton} onPress={() => openModalRecipe(item.recipeName, item.recipeImagePath, item.recipeContent)}>
                <Image style={styles.recipeImage} source={item.recipeImagePath} />
                </Pressable>
                <Text style={{flexShrink:1, paddingLeft: 5}}>{item.recipeDescription}</Text>
                </View>

            </View>}/>
          </View>
        </View>

      <Modal visible={modalOpen} transparent={true}>
        <View style={styles.modalContentRecipe}>
            <View style={styles.innerModalRecipe}>
            <ScrollView>
              <View style={{flexDirection:'row'}}>
                <Pressable style={{paddingTop:5, paddingLeft:5}}>
                  <FontAwesome name="md-heart-outline" size={25} color='gray' invisible={true} check />
                </Pressable>
                <Pressable onPress={() => setModalOpen(false)} style={{paddingLeft: 280, paddingTop: 5}}>
                  <FontAwesome name="md-close" size={25}/>
                </Pressable>
              </View>
              <View style={{alignItems: 'center'}}>
              <Image style={styles.recipeFullImage} source={Constants.SelectedRecipe.recipeImagePath} />
              </View>
              <View style={{alignItems: 'center', paddingTop: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{Constants.SelectedRecipe.recipeName}</Text>
                <Text>Difficulty: Easy | 30 minutes</Text>
              </View>
                <View style={{paddingTop: 15, paddingLeft: 15}}>
                  <Text>
                    {Constants.SelectedRecipe.recipeContent}
                  </Text>
                </View>  
              </ScrollView>
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