/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
        sans: ['Inter-Regular'],
        'inter-thin':['Inter-Thin'],
        'inter-light':['Inter-Light'],
        'inter-regular':['Inter-Regular'],
        'inter-medium':['Inter-Medium'],
        'inter-semibold':['Inter-SemiBold'],
        'inter-bold':['Inter-Bold'],
      },
    },
  },
  plugins: [],
}

