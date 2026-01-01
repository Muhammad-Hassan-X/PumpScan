/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sub_heading: "#717171",
        heading: "#d0d0d0",
        back_ground_color: "#242424",
        light_background_color: "#A64D79",
        active_color: "#6444fe"
      },
      fontFamily: {
        ubuntuRegular: ["Ubuntu-Regular"],
        ubuntuMedium: ["Ubuntu-Medium"],
        ubuntuBold: ["Ubuntu-Bold"],
      },
    },
  },
  plugins: [],
}