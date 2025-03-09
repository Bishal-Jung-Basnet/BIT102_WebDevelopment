import cyberpunk from './image/cyberpunk-2077.jpg';
import cyberpunk1 from './image/cyberpunk1.jpg';
import cyberpunk2 from './image/cyberpunk2.jpg';
import cyberpunk3 from './image/cyberpunk3.jpg';
import gtaV from './image/gta-v.jpg';
import rdr2 from './image/RDR2.jpg';
import eldenRing from './image/elden-ring.jpg';
import godOfWar from './image/god-of-war.jpg';
import witcher3 from './image/witcher-3.jpg';
import forzaHorizon5 from './image/forza-horizon-5.jpg';
import tekken8 from './image/tekken-8.jpg';
import starfield from './image/starfield.jpg';
import civ6 from './image/civilization-6.jpg';
import residentEvil4 from './image/resident-evil-4.jpg';
import darkSouls3 from './image/dark-souls-3.jpg';
import skyrim from './image/skyrim.jpg';
import streetFighter6 from './image/street-fighter-6.jpg';
import diablo4 from './image/diablo-4.jpg';

const games = [
    {
        id: "Cyberpunk-2077",
        title: "Cyberpunk 2077",
        category: "Action RPG",
        rating: 4.5,
        price: 5999,
        image: cyberpunk,
        screenshot1: cyberpunk1,
        screenshot2: cyberpunk2, 
        screenshot3: cyberpunk3,
        description: "Cyberpunk 2077 is an open-world RPG set in a futuristic cyber city.",
        discount: null,
        systemRequirements: {
            minimum: {
                OS: "Windows 10 64-bit",
                Processor: "Intel Core i5-4670K or AMD Ryzen 3 3200G",
                Memory: "8 GB RAM",
                Graphics: "NVIDIA GTX 970 / AMD RX 570",
                Storage: "70 GB available space",
            },
            recommended: {
                OS: "Windows 10 64-bit",
                Processor: "Intel Core i7-4790 or AMD Ryzen 5 3600",
                Memory: "12 GB RAM",
                Graphics: "NVIDIA GTX 1060 6GB / AMD RX 590",
                Storage: "70 GB SSD",
            },
        },
    },
    {
        id: "GTA-V",
        title: "Grand Theft Auto V",
        category: "Action",
        rating: 4.9,
        price: 6999,
        image: gtaV,
        description: "The next chapter in the Grand Theft Auto series, featuring an expansive open world.",
        discount: null,
        systemRequirements: {
            minimum: {
                OS: "Windows 10 64-bit",
                Processor: "Intel i7-4770 / AMD Ryzen 5 1600",
                Memory: "8 GB RAM",
                Graphics: "NVIDIA GTX 1660 / AMD RX 5500 XT",
                Storage: "120 GB SSD",
            },
            recommended: {
                OS: "Windows 11 64-bit",
                Processor: "Intel i5-9600K / AMD Ryzen 5 3600",
                Memory: "16 GB RAM",
                Graphics: "NVIDIA RTX 3060 / AMD RX 6700 XT",
                Storage: "120 GB SSD",
            },
        },
    },
    {
        id: "RDR-2",
        title: "Red Dead Redemption 2",
        category: "Action Adventure",
        rating: 4.8,
        price: 4999,
        image: rdr2,
        description: "A gripping Western epic set in a vast and immersive open world.",
        discount: null,
        systemRequirements: {
            minimum: {
                OS: "Windows 10 64-bit",
                Processor: "Intel Core i5-8400",
                Memory: "8 GB RAM",
                Graphics: "NVIDIA GTX 1050 Ti / AMD RX 570",
                Storage: "50 GB available space",
            },
            recommended: {
                OS: "Windows 11 64-bit",
                Processor: "Intel Core i7-9700K",
                Memory: "16 GB RAM",
                Graphics: "NVIDIA RTX 2060 / AMD RX 6600 XT",
                Storage: "50 GB SSD",
            },
        },
    },
    {
        id: "Elden-Ring",
        title: "Elden Ring",
        category: "Action RPG",
        rating: 4.9,
        price: 5999,
        image: eldenRing,
        description: "An epic RPG adventure set in a vast world crafted by Hidetaka Miyazaki and George R.R. Martin.",
        discount: 10,
    },
    {
        id: "God-Of-War",
        title: "God of War",
        category: "Action Adventure",
        rating: 4.9,
        price: 4999,
        image: godOfWar,
        description: "Follow Kratos and Atreus on their journey through the Norse realm.",
        discount: 15,
    },
    {
        id: "Witcher-3",
        title: "The Witcher 3: Wild Hunt",
        category: "Open World",
        rating: 4.8,
        price: 3999,
        image: witcher3,
        description: "An award-winning open-world RPG where you play as Geralt of Rivia.",
    },
    {
        id: "Forza-Horizon-5",
        title: "Forza Horizon 5",
        category: "Racing",
        rating: 4.7,
        price: 5999,
        image: forzaHorizon5,
        description: "A stunning open-world racing game set in Mexico.",
    },
    {
        id: "Tekken-8",
        title: "Tekken 8",
        category: "Fighting",
        rating: 4.8,
        price: 5999,
        image: tekken8,
        description: "The latest entry in the iconic Tekken fighting game series.",
    },
    {
        id: "Starfield",
        title: "Starfield",
        category: "Action RPG",
        rating: 4.6,
        price: 6999,
        image: starfield,
        description: "An interstellar adventure from the creators of Skyrim.",
    },
    {
        id: "Civilization-VI",
        title: "Sid Meier's Civilization VI",
        category: "Strategy",
        rating: 4.7,
        price: 2999,
        image: civ6,
        description: "Build an empire that stands the test of time in this classic strategy game.",
    },
    {
        id: "Resident-Evil-4",
        title: "Resident Evil 4",
        category: "Survival Horror",
        rating: 4.9,
        price: 5999,
        image: residentEvil4,
        description: "Survive the horrors of a deadly virus outbreak in this action-packed horror game.",
    },
    {
        id: "Dark-Souls-3",
        title: "Dark Souls III",
        category: "Action RPG",
        rating: 4.7,
        price: 3999,
        image: darkSouls3,
        description: "A dark and challenging RPG filled with epic boss fights.",
    },
    {
        id: "Skyrim",
        title: "The Elder Scrolls V: Skyrim",
        category: "Open World",
        rating: 4.9,
        price: 2999,
        image: skyrim,
        description: "An iconic RPG set in a vast, open world filled with adventure.",
    },
    {
        id: "Street-Fighter-6",
        title: "Street Fighter 6",
        category: "Fighting",
        rating: 4.7,
        price: 5999,
        image: streetFighter6,
        description: "The next evolution in the legendary fighting game series.",
    },
    {
        id: "Diablo-4",
        title: "Diablo IV",
        category: "Fantasy MMORPG",
        rating: 4.8,
        price: 6999,
        image: diablo4,
        description: "A dark and intense action RPG set in the Diablo universe.",
    }
];

export default games;