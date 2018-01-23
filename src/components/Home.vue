<template>
  <v-container grid-list-md text-xs-center>
    <div id="findRestrant" v-if="findRestrant">
      <h1 class="display-4">What's for dinner</h1>
      <h3 class="headline">An app randomly pick a restaurant for you based on a few input from you. Hope this will save you some time on choosing what to eat</h3>
      <v-form v-model="valid" ref="form" lazy-validation class="mt-3">
        <v-text-field
          label="ZipCode"
          v-model="searchData.zipCode"
          :rules="searchRules.zipCodeRules"
          required
        ></v-text-field>
        <v-checkbox
          label="Delivery"
          v-model="searchData.delivery"
        ></v-checkbox>
        <v-text-field
          label="Type of food"
          v-model="searchData.type"
          hint="Japanese, Bar, Pizza ..."
          :counter="15"
        ></v-text-field>
        <v-select
          label="Price Range"
          v-model="searchData.price"
          :items="priceRanges"
        ></v-select>
        <v-btn
          @click="find"
          :disabled="!valid"
        >
          Find
        </v-btn>
      </v-form>
      <h3 class="title">All restaurant data are from <span><img src="../assets/yelp_fullcolor.png" style="width:100px" alt="yelp-Logo" href="https://www.yelp.com"></span></h3>
    </div>
    <div id="progressBar" v-if="loading">
      <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
    </div>
    <div id="resultDisplay" v-if="resultDisplay">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-media :src="selected.image_url" height="200px">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox class="text-sm-left">
                    <v-btn @click="toHome" fab dark small color="primary">
                      <v-icon dark>chevron_left</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0 text-xs-left">{{selected.name}}</h3>
                <div class="text-xs-left">
                  <v-icon class="info--text" v-for="(star, index) in selected.customRating.full" :key="index">star</v-icon>
                  <v-icon class="info--text" v-show="selected.customRating.half">star_half</v-icon>
                  <span>{{selected.review_count}} Reviews</span>
                </div>
                <div class="text-xs-left">
                  <span v-for="(category, index) in selected.categories" :key="index"> {{category.title}} <span v-show="index < selected.categories.length-1">|</span></span>
                </div>
                <div v-if="selected.delivery" class="text-xs-left">
                  <v-icon class="primery--text">check_circle</v-icon><span>Delivery</span>
                </div>
                <div class="text-xs-left">
                  <span>{{selected.price}}</span>
                </div>
                <div class="text-xs-left mt-2">
                  <span class="body-2">Phone: </span><span>{{selected.phone}}</span> <br>
                  <span class="body-2">Address: </span><span v-for="(loc, index) in selected.location.display_address" :key="index">{{loc}} </span>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row justify-space-between>
                <v-flex xs6>
                  <v-btn :href="selected.url" flat color="green">More detial</v-btn>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                  <v-btn @click="selectRestrant" flat color="red">Find me another</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
            <div style="width:100%; position: relative">
              <google-map name="restaurant" :geoCode="selected.coordinates"></google-map>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      valid: true,
      findRestrant: true,
      loading: false,
      resultDisplay: false,
      searchData: {
        zipCode: '',
        delivery: false,
        type: '',
        price: ''
      },
      searchRules: {
        zipCodeRules: [
          (v) => !!v || 'Zipcode is required'
        ]
      },
      priceRanges: [
        {text: '$', value: '1'},
        {text: '$$', value: '2'},
        {text: '$$$', value: '3'},
        {text: '$$$$', value: '4'}
      ],
      resultData: [],
      selected: {},
      map: null
    }
  },
  methods: {
    getRandomNum (max) {
      return Math.floor(Math.random() * Math.floor(parseInt(max - 1)))
    },
    selectRestrant () {
      this.findRestrant = false
      this.loading = true
      this.resultDisplay = false
      var n = this.getRandomNum(this.resultData.length)
      this.selected = this.resultData[n]
      var rating = {}
      rating.full = parseInt(this.resultData[n].rating)
      rating.half = this.resultData[n].rating % 1
      this.selected.customRating = rating
      this.selected.delivery = this.selected.transactions.includes('delivery')
      this.findRestrant = false
      this.loading = false
      this.resultDisplay = true
    },
    find () {
      this.findRestrant = false
      this.loading = true
      this.resultDisplay = false
      var x = this
      axios.post('/restaurant', this.searchData)
        .then(function (response) {
          x.resultData = response.data.businesses
          x.selectRestrant()
        })
        .catch(function (error) {
          console.log(error)
          x.findRestrant = true
          x.loading = false
          x.resultDisplay = false
        })
    },
    toHome () {
      this.findRestrant = true
      this.loading = false
      this.resultDisplay = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
