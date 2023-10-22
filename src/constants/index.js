import { air, aminties, bath, bathroom, bedroom, cap, comfort2, comfort3, desert2, desert3, 
  dustbin, food2, food3, gift, internet, iron, location, pakring, pool, scene, scene2, sliderFood } from "../assets";
import { comfort, desert, food, area,  complex, coffee, dvd, fireplace, bbq, info,
   locker, pets, microwave, TV, washing} from "../assets";
import { gallery1, gallery2, gallery3, gallery4, gallery5 } from "../assets";
export const navLinks = [
  {
    id: "home",
    title: "Home",
    link:"/"
  },
  {
    id: "Destination",
    title: "Destination",
    link:"/dest"
  },
  {
    id: "Modern",
    title: "Modern",
    link:"/modern"
  },
  {
    id: "Stay",
    title: "Stay",
    link:"/"
  },
  {
    id: "Portfolio",
    title: "Portfolio",
    link:"/success"
  },
  {
    id: "button",
    title: "Button",
    link:"/dest"
  },
];
export const modern = [
  {
    id: "1",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : food,
   
  },
  {
    id: "2",
    title: "Comfort of Your Home",
    description : "Effortless shopping experience & Hassle Free Shopping",
    icon : comfort,
  },
  {
    id: "3",
    title: "Desert at your doorstep",
    description : "Embrace the Beauty and Tranquility of Nature around you",
    icon : desert,
  },
  {
    id: "4",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : comfort,
  },
  {
    id: "5",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : desert,
  },
  {
    id: "6",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : food,
  }
]
export const modernDetail = [
  {
    id: "1",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : [food2,food , food3],
   
  },
  {
    id: "2",
    title: "Comfort of Your Home",
    description : "Effortless shopping experience & Hassle Free Shopping",
    icon : [comfort2,comfort, comfort3]
  },
  {
    id: "3",
    title: "Desert at your doorstep",
    description : "Embrace the Beauty and Tranquility of Nature around you",
    icon : [desert3, desert2, desert],
  },
  {
    id: "4",
    title: "Equisite Cusine",
    description : "Prepare to tantalize your taste buds and embark",
    icon : [food2,food , food3],
  },
 
]
export const destinatons = [
  {
    id: "1",
    title: "Sunset Resort",
    location : "Joshua Tree, USA",
    icon : scene,
    details : {
      home : '',
      guest: '2',
      bedrooms : '3',
      bathroom : '3'
    },
    price : "23",
    review: 4, 
  },
  {
    id: "2",
    title: "Sunset  Resort",
    location : "Joshua Tree, USA",
    icon : scene2,
    details : {
      home : '',
      guest: '1',
      bedrooms : '2',
      bathroom : '2'
    },
    price : "43",
    review: 4, 
  },
  {
    id: "3",
    title: "Sunset Resort",
    location : "Joshua Tree, USA",
    icon:scene,
    details : {
      home : '',
      guest: '8',
      bedrooms : '5',
      bathroom : '6'
    },
    price : "213",
    review: 4, 
  },
  {
    id: "4",
    title: "Sunset Resort",
    icon : scene2,
    location : "Joshua Tree, USA",
    details : {
      home : '',
      guest: '3',
      bedrooms : '3',
      bathroom : '2'
    },
    price : "13",
    review: 4, 
  },
  {
    id: "5",
    title: "Sunset Resort",
    location : "Joshua Tree, USA",
    icon : scene2,
    details : {
      home : '',
      guest: '2',
      bedrooms : '1',
      bathroom : '2'
    },
    price : "10",
    review: 4, 
  },
  {
    id: "6",
    title: "Sunset  Resort",
    location : "Joshua Tree, USA",
    icon : scene,
    details : {
      home : '',
      guest: '4',
      bedrooms : '5',
      bathroom : '5'
    },
    price : "10",
    review: 4, 
  },
];
export const memorableStay = [
  {
    id: "1",
    title: "Food & Beverages",
    description : "At our hotel, we believe that food and beverages are an integral part of creating a memorable stay.",
    icon : sliderFood,
    tag:"food"
  },
  {
    id: "2",
    title: "Service & Amenities",
    description : "At our hotel, we are committed to providing unparalleled service and amenities to ensure that your stay exceeds your expectations in every way.",
    icon : aminties,
    tag:"services"
  },
  {
    id: "3",
    title: "Gift shop",
    description : "Step into our gift shop, a haven for those seeking unique treasures and mementos to commemorate their stay.",
    icon : gift ,
    tag:"Gift Shop"
  },

];
export const galleryData = [
  {
    id: "1",
    title: "Azure Heights Lodge",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon : gallery1,
  },
  {
    id: "2",
    title: "Harmony Valley Resort",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon: gallery2
  },
  {
    id: "3",
    title: "Coastal Breeze Inn",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon : gallery3
  },
  {
    id: "4",
    title: "Oasis Retreat Inn",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon: gallery4
  },
  {
    id: "5",
    title: "Serene Haven Hotel",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon : gallery5
  },
  {
    id: "6",
    title: "Serene Haven Hotel",
    description : "Offers endless opportunities for adventure enthusiasts.",
    star : 4.9,
    icon : gallery1
  },

] 


export const footerLinks = [
  {
    title: "Help",
    links: [
      {
        name: "Success Stories",
        link: "/success",
      },
      {
        name: "Book your stay",
        link: "/dest",
      },
      {
        name: "Embrace Modern Elegance",
        link: "/modern",
      },

    ],
  },
  {
    title: "About",
    links: [
      {
        name: "Expreience",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Contact",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "News",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Contact",
        link: "https://www.hoobank.com/blog/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Your Travel Stories",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Connect with Like-minded Travelers",
        link: "https://www.hoobank.com/become-a-partner/",
      },
      {
        name: "Events and Meetups",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
    title: "More",
    links: [
      {
        name: "Documentation",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "License",
        link: "https://www.hoobank.com/become-a-partner/",
      },
      {
        name: "Changelog",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

// export const socialMedia = [
//   {
//     id: "social-media-1",
//     icon: instagram,
//     link: "https://www.instagram.com/",
//   },
//   {
//     id: "social-media-2",
//     icon: facebook,
//     link: "https://www.facebook.com/",
//   },
//   {
//     id: "social-media-3",
//     icon: twitter,
//     link: "https://www.twitter.com/",
//   },
//   {
//     id: "social-media-4",
//     icon: linkedin,
//     link: "https://www.linkedin.com/",
//   },
// ];
export const aminities = [
  {
    id:"1", 
    title: "Air conditioner",
    icon: air
  },
  {
    id:"2", 
    title: "Hot Tub",
    icon: bath
  },
  {
    id:"3", 
    title: "Swiming pool",
    icon: pool
  },
  {
    id:"4", 
    title: "Iron",
    icon: iron
  },
  {
    id:"5", 
    title: "Internet",
    icon: internet
  },
  {
    id:"6", 
    title: "Parking",
    icon: pakring
  }
]

export const amenityIconMapping = {
  "Area": area,
  "BBQ": bbq,
  "Lockbox":locker,
  "Allow Pets":pets,
  "Wifi Code":internet,
  "Sleep Cap":cap,
  "Bedrooms":bedroom,
  "Trash Pick-up day":dustbin,
  "High Speed Internet":internet,
  "Washer and Dryer":washing,
  "Cable TV":TV,
  "King BR1":bedroom,
  "Bathroom 1":bathroom,
  'Bathroom':bathroom,
  "Bedroom 1 Level":bedroom,
  "Bathroom 2":bedroom,
  "En-Suite Bath BR":bedroom,
  "Microwave":microwave,
  "Hot Tub":bath,
  "TV Bed":TV,
  "DVD":dvd,
  "DVR":dvd,
  "ilink":info,
  "Fireplace":fireplace,
  "WiFi Router Name":internet,
  "Additional Bedding":bedroom,
  "Number of Bathrooms":bedroom,
  "Long Term Property":area,
  "Complex":complex,
  "Location":location, 
  "Coffee Machine":coffee
  
};
export const urlAPI = "https://rajanosha7.pythonanywhere.com"
export const userName =   'bsc20230607'
export const password =  '#20230607vhgfbefe#375378'
export const barefootAccount =  'v3cbsc0526'