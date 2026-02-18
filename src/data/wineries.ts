export type Winery = {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  hours: string;
  rating: number;
  outsideFoodPolicy: string;
  outsideFoodCost: string;
  maps: string;
};

export const wineries: Winery[] = [
  {
    id: 'chateau-elan-winery-and-resort',
    name: 'Chateau Elan Winery & Resort',
    address: '100 Rue Charlemagne Dr, Braselton, GA 30517',
    phone: '(678) 425-0900',
    website: 'https://www.chateauelan.com/winery',
    hours: 'Mon-Sun 11am-7pm',
    rating: 4.6,
    outsideFoodPolicy: 'No outside food or drink',
    outsideFoodCost: 'N/A',
    maps: 'https://maps.google.com/?q=Chateau+Elan+Winery+%26+Resort+Braselton+GA'
  },
  {
    id: 'wolf-mountain-vineyards-and-winery',
    name: 'Wolf Mountain Vineyards & Winery',
    address: '180 Wolf Mountain Trail, Dahlonega, GA 30533',
    phone: '(706) 867-9862',
    website: 'http://www.wolfmountainvineyards.com/',
    hours: 'Thu-Mon 11am-5pm',
    rating: 4.8,
    outsideFoodPolicy: 'Outside food allowed on deck',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Wolf+Mountain+Vineyards+%26+Winery+Dahlonega+GA'
  },
  {
    id: 'yonah-mountain-vineyards',
    name: 'Yonah Mountain Vineyards',
    address: '1717 GA-255, Cleveland, GA 30528',
    phone: '(706) 878-5522',
    website: 'https://www.yonahmountainvineyards.com/',
    hours: 'Mon-Sun 11am-6pm',
    rating: 4.7,
    outsideFoodPolicy: 'No outside alcohol, picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Yonah+Mountain+Vineyards+Cleveland+GA'
  },
  {
    id: 'tiger-mountain-vineyards',
    name: 'Tiger Mountain Vineyards',
    address: '2592 Old 441 South, Tiger, GA 30576',
    phone: '(706) 782-4777',
    website: 'https://www.tigerwine.com/',
    hours: 'Thu-Sun 12pm-6pm',
    rating: 4.5,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Tiger+Mountain+Vineyards+Tiger+GA'
  },
  {
    id: 'montaluce-winery-and-restaurant',
    name: 'Montaluce Winery & Restaurant',
    address: '946 Via Montaluce, Dahlonega, GA 30533',
    phone: '(706) 867-4060',
    website: 'https://montaluce.com/',
    hours: 'Wed-Sun 11am-9pm',
    rating: 4.4,
    outsideFoodPolicy: 'No outside food or beverage',
    outsideFoodCost: 'N/A',
    maps: 'https://maps.google.com/?q=Montaluce+Winery+Dahlonega+GA'
  },
  {
    id: 'frogtown-cellars',
    name: 'Frogtown Cellars',
    address: '700 Ridge Point Dr, Dahlonega, GA 30533',
    phone: '(706) 865-0687',
    website: 'https://www.frogtown.com/',
    hours: 'Thu-Sun 11am-5:30pm',
    rating: 4.6,
    outsideFoodPolicy: 'No outside food or drink',
    outsideFoodCost: 'N/A',
    maps: 'https://maps.google.com/?q=Frogtown+Cellars+Dahlonega+GA'
  },
  {
    id: 'habersham-winery',
    name: 'Habersham Winery',
    address: '7025 S Main St, Helen, GA 30545',
    phone: '(706) 878-9463',
    website: 'https://www.habershamwinery.com/',
    hours: 'Mon-Sun 11am-6pm',
    rating: 4.2,
    outsideFoodPolicy: 'No outside alcohol; snacks allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Habersham+Winery+Helen+GA'
  },
  {
    id: 'three-sisters-vineyards',
    name: 'Three Sisters Vineyards',
    address: '439 Vineyard Way, Dahlonega, GA 30533',
    phone: '(706) 865-9463',
    website: 'http://www.threesistersvineyards.com/',
    hours: 'Thu-Sun 11am-5pm',
    rating: 4.5,
    outsideFoodPolicy: 'Picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Three+Sisters+Vineyards+Dahlonega+GA'
  },
  {
    id: 'crane-creek-vineyards',
    name: 'Crane Creek Vineyards',
    address: '916 Crane Creek Rd, Young Harris, GA 30582',
    phone: '(706) 379-1236',
    website: 'https://www.cranecreekvineyards.com/',
    hours: 'Mon-Sat 11am-6pm, Sun 12:30pm-5pm',
    rating: 4.8,
    outsideFoodPolicy: 'Outside food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Crane+Creek+Vineyards+Young+Harris+GA'
  },
  {
    id: 'engelheim-vineyards',
    name: 'Engelheim Vineyards',
    address: '127 Lakeview Rd, Ellijay, GA 30540',
    phone: '(706) 635-9463',
    website: 'https://engelheim.com/',
    hours: 'Thu-Mon 12pm-6pm',
    rating: 4.7,
    outsideFoodPolicy: 'No outside food or beverage',
    outsideFoodCost: 'N/A',
    maps: 'https://maps.google.com/?q=Engelheim+Vineyards+Ellijay+GA'
  },
  {
    id: 'cavender-creek-vineyards-and-winery',
    name: 'Cavender Creek Vineyards & Winery',
    address: '3610 Cavender Creek Rd, Dahlonega, GA 30533',
    phone: '(706) 867-7700',
    website: 'https://cavendercreekvineyards.com/',
    hours: 'Thu 12:30-5:30pm, Fri 12:30-7pm, Sat 11am-7pm, Sun 12:30-5:30pm',
    rating: 4.7,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Cavender+Creek+Vineyards+Dahlonega+GA'
  },
  {
    id: 'kaya-vineyard-and-winery',
    name: 'Kaya Vineyard & Winery',
    address: '5400 Town Creek Rd, Dahlonega, GA 30533',
    phone: '(706) 219-3514',
    website: 'http://www.kayavineyards.com/',
    hours: 'Mon-Sun 11am-5pm',
    rating: 4.5,
    outsideFoodPolicy: 'No outside alcohol; picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Kaya+Vineyard+%26+Winery+Dahlonega+GA'
  },
  {
    id: 'boutier-winery',
    name: 'Boutier Winery',
    address: '4506 Hudson River Church Rd, Danielsville, GA 30633',
    phone: '(706) 789-0055',
    website: 'https://boutierwinery.com/',
    hours: 'Sat-Sun 1pm-6pm',
    rating: 4.3,
    outsideFoodPolicy: 'Outside food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Boutier+Winery+Danielsville+GA'
  },
  {
    id: 'the-cottage-vineyard-and-winery',
    name: 'The Cottage Vineyard & Winery',
    address: '5050 US-129, Cleveland, GA 30528',
    phone: '(706) 865-0053',
    website: 'http://www.cottagevineyardwinery.com/',
    hours: 'Mon-Sat 11am-6pm, Sun 12:30pm-6pm',
    rating: 4.6,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=The+Cottage+Vineyard+%26+Winery+Cleveland+GA'
  },
  {
    id: 'sharp-mountain-vineyards',
    name: 'Sharp Mountain Vineyards',
    address: '110 Rathgeb Trail, Jasper, GA 30143',
    phone: '(770) 735-1210',
    website: 'https://sharpmountainvineyards.com/',
    hours: 'Sat 12pm-6pm, Sun 12:30pm-5pm',
    rating: 4.4,
    outsideFoodPolicy: 'Picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Sharp+Mountain+Vineyards+Jasper+GA'
  },
  {
    id: 'cartecay-vineyards',
    name: 'Cartecay Vineyards',
    address: '5704 Clear Creek Rd, Ellijay, GA 30536',
    phone: '(706) 698-9463',
    website: 'https://www.cartecayvineyards.com/',
    hours: 'Mon-Sun 11am-6pm',
    rating: 4.6,
    outsideFoodPolicy: 'Outside food permitted',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Cartecay+Vineyards+Ellijay+GA'
  },
  {
    id: 'cenita-vineyards',
    name: 'CeNita Vineyards',
    address: '591 Dock Dorsey Rd, Cleveland, GA 30528',
    phone: '(706) 865-7478',
    website: 'https://cenitawinery.com/',
    hours: 'Thu-Sun 12pm-6pm',
    rating: 4.5,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=CeNita+Vineyards+Cleveland+GA'
  },
  {
    id: 'chateau-meichtry-family-vineyards',
    name: 'Chateau Meichtry Family Vineyards',
    address: '1862 Orchard Ln, Talking Rock, GA 30175',
    phone: '(706) 502-1608',
    website: 'http://chateaumeichtry.com/',
    hours: 'Mon-Sun 11am-6pm',
    rating: 4.8,
    outsideFoodPolicy: 'Picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Chateau+Meichtry+Family+Vineyard+Talking+Rock+GA'
  },
  {
    id: 'paradise-hills-winery-resort-and-spa',
    name: 'Paradise Hills Winery Resort & Spa',
    address: '366 Paradise Rd, Blairsville, GA 30512',
    phone: '(706) 745-7483',
    website: 'http://www.paradisehillsresort.com/',
    hours: 'Mon-Sun 12pm-6pm',
    rating: 4.7,
    outsideFoodPolicy: 'Outside food permitted',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Paradise+Hills+Resort+Blairsville+GA'
  },
  {
    id: 'bear-claw-vineyards',
    name: 'Bear Claw Vineyards',
    address: '2281 Tennis Court Rd, Blue Ridge, GA 30513',
    phone: '(706) 223-3750',
    website: 'https://bearclawvineyards.com/',
    hours: 'Mon-Sat 12pm-6pm, Sun 1pm-5pm',
    rating: 4.5,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Bear+Claw+Vineyards+Blue+Ridge+GA'
  },
  {
    id: 'odom-springs-vineyards',
    name: 'Odom Springs Vineyards',
    address: '637 Odom Rd, Blairsville, GA 30512',
    phone: '(706) 745-3094',
    website: 'http://www.odomspringsvineyards.com/',
    hours: 'Fri-Sun 12pm-6pm',
    rating: 4.6,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Odom+Springs+Vineyards+Blairsville+GA'
  },
  {
    id: 'stonewall-creek-vineyards',
    name: 'Stonewall Creek Vineyards',
    address: '323 Standing Deer Ln, Tiger, GA 30576',
    phone: '(706) 212-0584',
    website: 'https://stonewallcreek.com/',
    hours: 'Thu-Sun 12pm-5pm',
    rating: 4.7,
    outsideFoodPolicy: 'Outside food permitted',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Stonewall+Creek+Vineyards+Tiger+GA'
  },
  {
    id: 'hightower-creek-vineyards',
    name: 'Hightower Creek Vineyards',
    address: '7150 Canaan Dr, Hiawassee, GA 30546',
    phone: '(706) 896-8963',
    website: 'http://www.hightowercreekvineyards.com/',
    hours: 'Thu-Sun 12pm-6pm',
    rating: 4.6,
    outsideFoodPolicy: 'Picnic food allowed',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Hightower+Creek+Vineyards+Hiawassee+GA'
  },
  {
    id: 'georgia-winery',
    name: 'Georgia Winery',
    address: '6469 Battlefield Pkwy, Ringgold, GA 30736',
    phone: '(706) 937-9463',
    website: 'https://georgiawines.com/',
    hours: 'Mon-Sat 10am-6pm, Sun 12:30pm-6pm',
    rating: 4.5,
    outsideFoodPolicy: 'No outside food or drink',
    outsideFoodCost: 'N/A',
    maps: 'https://maps.google.com/?q=Georgia+Winery+Ringgold+GA'
  },
  {
    id: 'currahee-vineyard-and-winery',
    name: 'Currahee Vineyard & Winery',
    address: '3301 W Currahee St, Toccoa, GA 30577',
    phone: '(706) 768-5383',
    website: 'https://curraheevineyards.com/',
    hours: 'Thu-Sat 12pm-6pm',
    rating: 4.6,
    outsideFoodPolicy: 'Outside food welcome',
    outsideFoodCost: 'Free',
    maps: 'https://maps.google.com/?q=Currahee+Vineyard+%26+Winery+Toccoa+GA'
  }
];
