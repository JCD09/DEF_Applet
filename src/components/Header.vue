<template>
    <div class="header">
        <img :src="logo">
        <span id="text">Decision Calculator - Weight and Rate Method</span>
    </div>
</template>

<script>
import logo from '../assets/DEF_Square_Red_Logo_High_Res.jpg'

export default {
    name: 'Header',
    data: function () {
        return {
            logo: logo
        }
    }
}
</script>

<style>
.header {
    background-color:#b00800;
    display: flex;
    align-items:center;
    height: auto;
}
img{
    width: 5%;
    height: auto
}
#text{
    margin-left: 35px;
    font-family: "HelveticaNeue-Light";
    font-size: 32px;
    color: white;
}
</style>