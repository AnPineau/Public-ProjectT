<template>
  <div class="root">

      <input type="text" placeholder="Search" />
      <button>
          <img :src="require('@/assets/svg/search.svg')" alt="search" />
      </button>

  </div>
</template>

<script>
export default {
    name: 'SearchBox'
}
</script>

<style lang="scss" scoped>

@import '@/assets/style.scss';

.root {
    display: flex;
    
}


input {
    height: 35px;
    max-width: 550px;
    min-width: 300px;
    background-color: #121212;
    color: white;
    border: solid 1px #303030;
    border-radius: 5px 0px 0px 5px;
    padding-left: 10px;
    font-size: 16px;
    &::placeholder {
        color: #727272;
        font-weight: 300;
        font-size: 16px;
    }
    &:focus {
		outline: solid 1px #08a4ffbd;
		outline-offset: -1px;
	}
}

button {
    background-color: #303030;
    border: none;
    border-radius: 0px 5px 5px 0px;
    width: 51px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        height: 20px;
        width: 15px;
    }
    &:hover {
        cursor: pointer;
        background-color:#3a3a3a
    }
}

</style>