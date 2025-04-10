<template>
  <div
    class="min-h-screen p-20 w-full"
    :class="darkMode ? 'bg-slate-700 text-white' : 'bg-slate-300 text-black'"
  >
    <h2 class="font-bold mb-7">تنظیمات کاربر</h2>
    <div class="flex items-center flex-col w-full">
      <label class="mb-4">انتخاب رنگ theme</label>
      <Toggle
        v-model="darkMode"
        onLabel="روشن"
        offLabel="خاموش"
        color="#111827"
        :rounded="true"
        :width="150"
        :height="40"
      />
      <label class="my-4">انتخاب سایز فونت </label>
      <select
        class="w-36 rounded-md"
        v-model="fontSize"
        @change="setFonts"
        :class="
          darkMode
            ? 'bg-slate-700 text-white border border-slate-100'
            : 'bg-slate-300 text-black border border-slate-700'
        "
      >
        <option value="small">کوچک</option>
        <option value="medium">متوسط</option>
        <option value="large">بزرگ</option>
      </select>
    </div>
  </div>
</template>
<script>
import Toggle from "@vueform/toggle";
export default {
  name: "SettingUser",
  components: { Toggle },
  data() {
    return {
      fontSize: "medium",
      saved: false,
      darkMode: false,
    };
  },
  created() {
    const savedValue = localStorage.getItem("darkMode");
    this.saved = savedValue == "true";
    this.darkMode = this.saved;
    document.body.style.background = this.saved
      ? "oklch(27.9% 0.041 260.031)"
      : "#fff";
    const savedFonts = localStorage.getItem("fontSize");
    if (savedFonts) {
      this.fontSize = savedFonts;
      this.applyFonts();
    }
  },
  methods: {
    setFonts() {
      localStorage.setItem("fontSize", this.fontSize);
      this.applyFonts();
    },
    applyFonts() {
      let fontsizeValue;
      switch (this.fontSize) {
        case "small":
          fontsizeValue = "14px";
          break;
        case "medium":
          fontsizeValue = "16px";
          break;
        case "large":
          fontsizeValue = "18px";
          break;
      }
      document.body.style.fontSize = fontsizeValue;
    },
  },
  watch: {
    darkMode(val) {
      localStorage.setItem("darkMode", val);
      this.saved = val;
      document.body.style.background = this.saved
        ? "oklch(27.9% 0.041 260.031)"
        : "#fff";
    },
  },
};
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.toggle-label {
  width: calc(
    var(--toggle-width, 3.25rem) - var(--toggle-height, 1.25rem)
  ) !important;
}
</style>
