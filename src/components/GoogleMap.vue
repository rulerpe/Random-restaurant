<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  name: 'google-map',
  props: ['name', 'geoCode'],
  data: function () {
    return {
      mapName: this.name + '-map',
      map: null,
      marker: null
    }
  },
  watch: {
    geoCode: function () {
      this.createMap()
    }
  },
  methods: {
    createMap () {
      const element = document.getElementById(this.mapName)
      const uluru = {lat: this.geoCode.latitude, lng: this.geoCode.longitude}
      const options = {
        zoom: 14,
        center: uluru
      }
      this.map = new google.maps.Map(element, options)
      this.marker = new google.maps.Marker({
        position: uluru,
        map: this.map
      })
    }
  },
  mounted: function () {
    this.createMap()
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 400px;
  margin: 0 ;
  background: gray;
}
</style>
