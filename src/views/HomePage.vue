<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h3>Home Page works</h3>
      <!-- <ion-button size="small" :to="'/todos1'">todos</ion-button> -->
      <ion-button router-link="/todos/todos1">todos1</ion-button>
      <ion-button router-link="/todos/todos2">todos2</ion-button>
      <!-- <router-link :to="'/todos/todos1'">todos1</router-link><br />
      <router-link :to="'/todos/todos2'">todos2</router-link> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue'
</script>

<style></style>
