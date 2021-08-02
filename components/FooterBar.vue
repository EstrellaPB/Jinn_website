<template>
    <footer>
        
        <b-nav class="nav footerbar">
            <b-nav-item active class="text-light text-uppercase">Destinations</b-nav-item>
            <b-nav-item  class="text-light text-uppercase">Advisors</b-nav-item>
            <b-nav-item  class="text-light text-uppercase">Carrers</b-nav-item>
            <b-nav-item  class="text-light text-uppercase">privacy & terms</b-nav-item>
        
            <div class="d-flex ml-auto">   
                <b-nav-item  class="text-light text-uppercase"><font-awesome-icon :icon="['fab', 'instagram']" size="2x"/></b-nav-item>   
                <b-nav-item  class="text-light text-uppercase"><font-awesome-icon :icon="['fab', 'facebook-square']" size="2x"/></b-nav-item>   
            </div>
        </b-nav>
     

        <nav class="footerbar">
            <a class="nav-link active text-light text-uppercase" href="#">© JINN HOST & CONSARGE</a>
        </nav>
    </footer>
</template>

<script>
export default {
    
}
</script>
<style lang="scss" scoped>
	@import "~assets/css/components/footer-bar.scss";
</style>

