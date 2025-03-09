// gameData.js
import cyberpunk from './image/cyberpunk-2077.jpg';
import gtaVI from './image/gtaVI.jpg';
import rdr2 from './image/RDR2.jpg';
const games = [
    {
      id: "Cyberpunk-2077",
      title: "Cyberpunk 2077",
      category: "Action RPG",
      rating: 4.5,
      price: 5999,
      image: cyberpunk,
      description: "Cyber Nexus 2077 is an open-world RPG set in a futuristic city.",
      discount: null,
      systemRequirements: {
        minimum: {
          OS: "Windows 10 64-bit",
          Processor: "Intel Core i5-4670K or AMD Ryzen 3 3200G",
          Memory: "8 GB RAM",
          Graphics: "NVIDIA GeForce GTX 970 or AMD Radeon RX 570",
          DirectX: "Version 12",
          Storage: "70 GB available space",
        },
        recommended: {
          OS: "Windows 10 64-bit",
          Processor: "Intel Core i7-4790 or AMD Ryzen 5 3600",
          Memory: "12 GB RAM",
          Graphics: "NVIDIA GeForce GTX 1060 6GB or AMD Radeon RX 590",
          DirectX: "Version 12",
          Storage: "70 GB SSD",
        },
      },
    },
    {
        id: "GTA-VI",
        title: "Grand Theft Auto VI",
        category: "Action",
        rating: 4.8,
        price: 49.99,
        image: gtaVI,
        description: "Coming soon.",
        discount: null,
        systemRequirements: {
          minimum: {
            OS: "Windows 10 64-bit",
            Processor: "Intel Core i5-8400",
            Memory: "8 GB RAM",
            Graphics: "NVIDIA GTX 1050 Ti / AMD RX 570",
            DirectX: "Version 12",
            Storage: "50 GB available space",
          },
          recommended: {
            OS: "Windows 11 64-bit",
            Processor: "Intel Core i7-9700K",
            Memory: "16 GB RAM",
            Graphics: "NVIDIA RTX 2060 / AMD RX 6600 XT",
            DirectX: "Version 12",
            Storage: "50 GB SSD",
          },
        },
      },
    {
      id: "RDR-2",
      title: "Read Dead Redemption 2",
      category: "Action Adventure",
      rating: 4.8,
      price: 49.99,
      image: rdr2,
      description: "Embark on an intergalactic journey across star systems.",
      discount: null,
      systemRequirements: {
        minimum: {
          OS: "Windows 10 64-bit",
          Processor: "Intel Core i5-8400",
          Memory: "8 GB RAM",
          Graphics: "NVIDIA GTX 1050 Ti / AMD RX 570",
          DirectX: "Version 12",
          Storage: "50 GB available space",
        },
        recommended: {
          OS: "Windows 11 64-bit",
          Processor: "Intel Core i7-9700K",
          Memory: "16 GB RAM",
          Graphics: "NVIDIA RTX 2060 / AMD RX 6600 XT",
          DirectX: "Version 12",
          Storage: "50 GB SSD",
        },
      },
    },
];
  
  export default games;  