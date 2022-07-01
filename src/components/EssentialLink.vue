<template>
  <q-item @click="navigate" clickable>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" :class="color" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="color">{{ title }}</q-item-label>
      <q-item-label :class="color" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const router = useRouter();
    return {
      navigate() {
        props.link.startsWith("http")
          ? window.open(props.link, "_blank")
          : router.push(props.link);
      },
    };
  },
});
</script>
