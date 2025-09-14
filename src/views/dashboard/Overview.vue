<template>
    <div>
       <h2>Overview</h2> 

       <h4>Hi <strong>{{ email }}</strong></h4>
    </div>
</template>
<script>

import { mapState } from 'pinia';
import { useAuthStore } from '../../store/authStore';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(useAuthStore,{
            email: 'email'
        }),
    }
}
</script>
<style>
    
</style>