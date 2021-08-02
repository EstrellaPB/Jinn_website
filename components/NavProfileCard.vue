<template>
    <div>
        <b-card title="Profile" no-body>
            <b-card-header header-tag="nav">
                <b-nav card-header pills>
                    <b-nav-item to="/profile" exact exact-active-class="active">Profile</b-nav-item>
                    <b-nav-item to="/profile/my-properties" active-class="active">My properties</b-nav-item>
                    <b-nav-item to="/profile/favorites" exact exact-active-class="active">My favorite saved properties</b-nav-item>
                </b-nav>
            </b-card-header>

            <b-card-body class="">
                <b-card-text>
                    <slot></slot>
                </b-card-text>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    
}
</script>