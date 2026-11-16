// Shared site content. No unverified claims, no AI-assistant wording,
// no member counts, no early-access claims.
export const PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.fitflare.tribr'
export const PRIVACY_URL = 'https://wake-owl-63073760.figma.site/privacy'
export const API_BASE = 'https://api.tribrs.com/api'
export const CONTACT_EMAIL = 'admin@tribrs.com'

// Local free-license stock clips (Wikimedia Commons, see public/video-manifest.json).
// Each slug maps to /videos/<slug>.mp4 + /posters/<slug>.jpg.
export const CLIPS = {
  soccer: { src: '/videos/soccer.mp4', poster: '/posters/soccer.jpg', label: 'Soccer' },
  basketball: { src: '/videos/basketball.mp4', poster: '/posters/basketball.jpg', label: 'Basketball' },
  cricket: { src: '/videos/cricket.mp4', poster: '/posters/cricket.jpg', label: 'Cricket' },
  yoga: { src: '/videos/yoga.mp4', poster: '/posters/yoga.jpg', label: 'Yoga' },
  dance: { src: '/videos/dance.mp4', poster: '/posters/dance.jpg', label: 'Dance' },
  running: { src: '/videos/running.mp4', poster: '/posters/running.jpg', label: 'Running' },
  cycling: { src: '/videos/cycling.mp4', poster: '/posters/cycling.jpg', label: 'Cycling' },
  swimming: { src: '/videos/swimming.mp4', poster: '/posters/swimming.jpg', label: 'Swimming' },
  strength: { src: '/videos/strength.mp4', poster: '/posters/strength.jpg', label: 'Strength' },
  hiit: { src: '/videos/hiit.mp4', poster: '/posters/hiit.jpg', label: 'HIIT' },
  hiking: { src: '/videos/hiking.mp4', poster: '/posters/hiking.jpg', label: 'Hiking' },
  capoeira: { src: '/videos/capoeira.mp4', poster: '/posters/capoeira.jpg', label: 'Capoeira' },
  skate: { src: '/videos/skate.mp4', poster: '/posters/skate.jpg', label: 'Skateboarding' },
  volleyball: { src: '/videos/volleyball.mp4', poster: '/posters/volleyball.jpg', label: 'Volleyball' },
  tennis: { src: '/videos/tennis.mp4', poster: '/posters/tennis.jpg', label: 'Tennis' },
  boxing: { src: '/videos/boxing.mp4', poster: '/posters/boxing.jpg', label: 'Boxing' },
  rowing: { src: '/videos/rowing.mp4', poster: '/posters/rowing.jpg', label: 'Rowing' },
  surfing: { src: '/videos/surfing.mp4', poster: '/posters/surfing.jpg', label: 'Surfing' },
  climbing: { src: '/videos/climbing.mp4', poster: '/posters/climbing.jpg', label: 'Climbing' },
  aerobics: { src: '/videos/aerobics.mp4', poster: '/posters/aerobics.jpg', label: 'Aerobics' },
  'football-training': { src: '/videos/football-training.mp4', poster: '/posters/football-training.jpg', label: 'Football training' },
  gym: { src: '/videos/gym.mp4', poster: '/posters/gym.jpg', label: 'Gym' },
  stretching: { src: '/videos/stretching.mp4', poster: '/posters/stretching.jpg', label: 'Stretching' },
  sprint: { src: '/videos/sprint.mp4', poster: '/posters/sprint.jpg', label: 'Sprint' },
}

// Preview fallback posts — clearly labelled as previews, never presented as real posts.
export const FALLBACK_POSTS = [
  { id: 'preview-soccer', clip: 'soccer', caption: 'Matchday energy. Play, train, watch, and talk the beautiful game — together.' },
  { id: 'preview-running', clip: 'running', caption: 'Morning miles with your Tribe. Show up, move, grow together.' },
  { id: 'preview-dance', clip: 'dance', caption: 'Move to the music. Dance Tribes, studio classes, and street crews.' },
  { id: 'preview-strength', clip: 'strength', caption: 'Lift day. Steady progress, one session at a time.' },
  { id: 'preview-yoga', clip: 'yoga', caption: 'Breathe, stretch, flow. A calm space to move together.' },
  { id: 'preview-basketball', clip: 'basketball', caption: 'Pickup runs and league nights. Show up, play hard, grow together.' },
]

export const TRIBES = [
  { name: 'Beautiful Game Tribe', sport: 'Soccer', clip: 'soccer', desc: 'For everyone who lives for football. Play, train, watch, and talk the beautiful game — together. All levels welcome, from Sunday league to serious training.' },
  { name: 'Hoops Tribe', sport: 'Basketball', clip: 'basketball', desc: 'For everyone who loves the game — pickup runs, league nights, training, and everything in between. Show up, play hard, and grow together. All levels welcome.' },
  { name: 'Cricket Tribe', sport: 'Cricket', clip: 'cricket', desc: 'For everyone who loves cricket — batters, bowlers, fielders, and fans. Nets, matches, and the long game, together. All levels welcome, from backyard cricket to club cricket.' },
  { name: 'Flow State Yoga', sport: 'Yoga', clip: 'yoga', desc: 'A calm, welcoming space to move, breathe, and stretch — together. Flows for every level, from first-timers to regular practice. Come as you are.' },
  { name: 'Rhythm & Moves', sport: 'Dance', clip: 'dance', desc: 'Dance crews, studio classes, and street sessions. Learn the steps, feel the music, move together.' },
  { name: 'Morning Mile Tribe', sport: 'Running', clip: 'running', desc: 'Early miles, long runs, and race-day goals. Runners of every pace, moving together.' },
  { name: 'Road Riders', sport: 'Cycling', clip: 'cycling', desc: 'Group rides, climbs, and coffee stops. Road, gravel, and everything in between.' },
  { name: 'Aqua Tribe', sport: 'Swimming', clip: 'swimming', desc: 'Laps, open water, and swim sets. For everyone who loves the water.' },
  { name: 'Barbell Society', sport: 'Strength', clip: 'strength', desc: 'Lifters who show up for each other. Strength training, technique, and steady progress.' },
  { name: 'HIIT Nation', sport: 'HIIT', clip: 'hiit', desc: 'Short, sharp, sweaty. High-intensity sessions you can do anywhere, together.' },
  { name: 'Trail Seekers', sport: 'Hiking', clip: 'hiking', desc: 'Trails, summits, and fresh air. Walk, hike, and explore with your Tribe.' },
  { name: 'Roda Tribe', sport: 'Capoeira', clip: 'capoeira', desc: 'Capoeira, movement, and music. Play the game, learn the roda, move together.' },
  { name: 'Concrete Crew', sport: 'Skateboarding', clip: 'skate', desc: 'Skate parks, street spots, and sessions. Roll with your crew.' },
  { name: 'Net Setters', sport: 'Volleyball', clip: 'volleyball', desc: 'Beach and indoor volleyball. Serve, set, spike — together.' },
  { name: 'Baseline Tribe', sport: 'Tennis', clip: 'tennis', desc: 'Tennis players of every level. Rallies, matches, and court time together.' },
  { name: 'Fight Camp', sport: 'Boxing', clip: 'boxing', desc: 'Boxing training, bag work, and footwork. Train hard, support each other.' },
  { name: 'Stroke & Glide', sport: 'Rowing', clip: 'rowing', desc: 'Rowing crews on the water and on the erg. Pull together.' },
  { name: 'Wave Riders', sport: 'Surfing', clip: 'surfing', desc: 'Surfers chasing waves. Dawn patrols, beach days, and shared stoke.' },
  { name: 'Summit Tribe', sport: 'Climbing', clip: 'climbing', desc: 'Climbers on the wall and on the rock. Boulder, top-rope, and beyond.' },
  { name: 'Step Up Crew', sport: 'Aerobics', clip: 'aerobics', desc: 'High-energy group classes. Step, move, sweat, and smile together.' },
  { name: 'Academy Tribe', sport: 'Soccer', clip: 'football-training', desc: 'Football drills, skills, and training sessions. Passing, shooting, dribbling, defending.' },
  { name: 'Iron House', sport: 'Gym', clip: 'gym', desc: 'Gym regulars who train together. Machines, free weights, and workout partners.' },
  { name: 'Breathe & Bend', sport: 'Stretching', clip: 'stretching', desc: 'Mobility, stretching, and recovery. Move well, feel good, together.' },
  { name: 'Track Stars', sport: 'Running', clip: 'sprint', desc: 'Sprinters and track athletes. Speed work, starts, and race-day energy.' },
]

export const JOURNEY_STOPS = [
  { n: '01', title: 'Check in with your Tribe', clip: 'dance', text: 'Set your intention for the day with the people who move like you. Say hello, share your plan, and feel part of something before you even start.' },
  { n: '02', title: 'Plan your day', clip: 'stretching', text: 'Pick a workout, a class, or a challenge that fits your day. Your Tribe keeps the plan honest — and fun.' },
  { n: '03', title: 'Train together', clip: 'hiit', text: 'Work out in the app, in a live class, or out in the world with your Tribe. Track it, share it, celebrate it.' },
  { n: '04', title: 'Check in and recover', clip: 'yoga', text: 'Log how it went, how you feel, and what is next. Rest days count too — recovery is part of the journey.' },
  { n: '05', title: 'Keep the streak alive', clip: 'sprint', text: 'Streaks, Sweat Duels, and challenges keep you coming back. Small wins, every day, with your people beside you.' },
]

export const FEATURES = [
  { name: 'Nearby Tribes', clip: 'soccer', text: 'Find Tribes near you. Discover communities that share your passions, in your neighborhood and around the world.' },
  { name: 'Messages', clip: 'dance', text: 'Chat with your Tribe and your training partners. Plan sessions, share wins, and keep each other going.' },
  { name: 'Sweat Duels', clip: 'boxing', text: 'Challenge a friend or a rival Tribe. Head-to-head workouts where bragging rights are on the line.' },
  { name: 'Coin Rewards', clip: 'strength', text: 'Earn TribrsCoins for showing up, posting, and completing challenges. Coins live on the rail, right where your thumb is.' },
  { name: 'Activity Tracking', clip: 'running', text: 'Track workouts, runs, rides, and sessions. Activity Tracking works with Health Connect to keep your progress in one place.' },
  { name: 'Live Challenges', clip: 'cycling', text: 'Join live challenges as they happen. Compete, cheer, and climb the leaderboard together.' },
  { name: 'Live Classes', clip: 'aerobics', text: 'Book live classes with trainers and creators. Train in real time, from wherever you are.' },
  { name: 'Tribe Community', clip: 'cricket', text: 'Your Tribe is your home base. Posts, events, and conversations with the people who share your sport.' },
  { name: 'Family & Groups', clip: 'hiking', text: 'Train with family and your closest groups. Shared goals, shared streaks, shared memories.' },
  { name: 'Fitness Buddy', clip: 'gym', text: 'Find a training partner who matches your goals and your schedule. Show up together, stay consistent together.' },
  { name: 'Creator Marketplace', clip: 'capoeira', text: 'Discover creators, classes, and content made by the community. Support the people who inspire your training.' },
]

export const PEOPLE = [
  { name: 'Maya', role: 'Dance creator', clip: 'dance', text: 'Dance classes, choreography, and studio energy — shared with her Tribe every week.' },
  { name: 'Jordan', role: 'Basketball trainer', clip: 'basketball', text: 'Pickup runs, drills, and league nights. Jordan builds the game around the people in it.' },
  { name: 'Priya', role: 'Yoga teacher', clip: 'yoga', text: 'Morning flows and breathwork for every level. Come as you are, leave a little lighter.' },
  { name: 'Sam', role: 'Running lead', clip: 'running', text: 'Marathon training plans and morning miles. Sam keeps the whole Tribe moving.' },
  { name: 'Alex', role: 'Strength lead', clip: 'strength', text: 'Barbell technique and steady progression. Lift well, lift together.' },
  { name: 'Riley', role: 'HIIT instructor', clip: 'hiit', text: 'Short, sharp sessions you can do anywhere. Riley brings the energy, you bring the sweat.' },
  { name: 'Noah', role: 'Cycling lead', clip: 'cycling', text: 'Group rides and climbs. Noah plans the route, the Tribe brings the legs.' },
  { name: 'Lena', role: 'Swim lead', clip: 'swimming', text: 'Laps, technique, and open-water confidence. Lena meets every swimmer where they are.' },
]
