<template>
  <div class="preroot"> <!-- otherwise parent'css leaks into here -->
    <div class="root">

      <div class="thumbnail">
        <img :src="tournoi.thumbnails[0]" />
        <img :src="tournoi.thumbnails[1]" />
      </div>

      

      <div class="infos">
        <h4 class="title">{{tournoi.title}}</h4>

        <div class="author">{{tournoi.author}}</div>

        <div class="numbers">
          <div class="likes">⭐ {{ tournoi.likes }}</div>
          <div class="played">▶ 4564{{ tournoi.totalPlayed }}</div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
export default {
    name: 'TournoiItem',
    data() {
        return {
            tournoi: this.props_tournoi
        };
    },
    props: {
        props_tournoi: Object
    }
};
</script>

<style lang="scss" scoped>
.root {
    display: flex;
    flex-direction: column;
}
.thumbnail {
    display: flex;
    flex-direction: row;
}
.thumbnail img {
    max-height: 100%;
    max-width: 50%;
    overflow: hidden;
    object-fit: cover;
    height: 150px;
}
.infos {
  
  .title {
    display: block;
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin: 5px 0px 3px 0px;
  }
  .author {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.5px;;
      color: #909090;
      margin-bottom: 3px;
  }
  .numbers {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    line-height: 19px;
    .played {
      margin-left: 30px;
    }
  }
}

</style>