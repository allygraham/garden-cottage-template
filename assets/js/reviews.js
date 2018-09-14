var source = document.getElementById("reviewList").innerHTML;
var template = Handlebars.compile(source);

Handlebars.registerHelper('if_even', function(conditional, options) {
  if((conditional % 2) == 0) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

var context = {
  reviews: [
    {
      title: 'Just left this cottage and wish I was still there',
      rating: 5,
      date: 'July 2018',
      comment: `I visited from 7th-14th July with my family and we all loved it. It\'s a very comfortable 
      house with everything you could need, just a lovely, relaxing place to be. We particularly liked the 
      garden which is great for kids playing and adults chilling.<br />It\'s close to everything and there's a 
      lot to do nearby.<br />There's nothing any of us could fault. Loved it!`,
      name: 'Karen M',
    },
    {
      title: 'Garden cottage',
      rating: 5,
      date: 'June 2018',
      comment: `Hi we had a fab week at this well equipped cottage. Garden was great very sheltered. We made use of 
      all the handy beach equipment to go to Kingsbarns beach.`,
      name: 'Irene W',
    },
    {
      title: 'Crail weekend',
      rating: 5,
      date: 'March 2018',
      comment: `Comfortable house Had great weekend weather wise Clean and well equipped Blinds missing in one upstairs bedroom`,
      name:'Dr Nicola G',
    },
    {
      title: 'Second visit',
      rating: 5,
      date: 'December 2017',
      comment: `Our second visit to Garden Cottage was every bit as special as the first - this time we had a short weekend break for a birthday celebration and were delighted
      to be greeted with a festive wreath on the front door and a beautiful Christmas tree when we walked in. The property is just perfect for family celebrations with sociable 
      living space and the luxurious bedrooms. Even the dog, Bonnie, got very excited when we arrived and ran circles around the back garden! We cannot recommend this accommodation 
      highly enough and can’t wait to return in the summer for a longer break.`,
      name: 'Coleena B',
    },
    {
      title: 'Great house with everything you need in the lovely unspoilt village of Crail.',
      rating: 5,
      date: 'August 2017',
      comment: `Garden Cottage is located in the lovely unspoilt fishing village of Crail. Minutes from a small beach with many rock pools and areas of sand. A couple of miles away 
      the beach at Kings Barns is just amazing with endless sandy beaches interspersed with rocky outcrops.The house is very quiet and set well back from the road with easy parking 
      for 2 cars. The layout is perfect for a large family/group and the garden private and quiet for children, lazy days and dogs! So much to see and do in this area with St Andrews 
      only 10 miles away and lovely gardens at Cambo House.`,
      name:'A FlipKey',
    },
    {
      title: 'Idyllic escape',
      rating: 5,
      date: 'July 2017',
      comment: `Garden Cottage is the perfect family get away - the house is a luxurious escape with sociable, open plan living, a beautiful garden on three levels, and every need 
      catered to - plus a lovely welcome bottle of wine! The property was perfect for us (and our dog), being just a short walk from the village shops and pubs but also just five 
      minutes from the shore and a short drive to all of our favourite East Neuk spots. We have stayed in a number of self catering properties in the East Neuk, but Garden Cottage 
      is our new favourite and will be our number one choice in future - we have already shared this gem of a find with friends and family!`,
      name:'Coleena B',
    },
    {
      title: 'Perfect stay',
      rating: 5,
      date: 'April 2017',
      comment: `Great house, great hospitality, better people ! thanks for a memorable stay. All of my group had a wonderful time.`,
      name:'Colin K',
    },
    {
      title: 'Garden cottage Crail',
      rating: 5,
      date: 'April 2017',
      comment: `The whole package. From booking to information. The house is top class with every facility catered. Great location. 
      We as a family have had a good relaxing break. Great for kids also. Will be back.`,
      name:'Desmond G',
    },
    {
      title: 'Superb!!',
      rating: 5,
      date: 'April 2017',
      comment: `Wonderful house with everything you could ask for!! Every member of the family aged from 10 to 70 loved it. 
      Couldn't fault anything and had a great time. We will return.`,
      name:'Fred O\'Hara',
    },
    {
      title: 'Garden cottage',
      rating: 5,
      date: 'March 2017',
      comment: `This was wonderful accommodation with everything you could ever need.It was very comfortable.We spent four nights 
      there last New Year,and would thoroughly recommend it to anyone wishing to stay there.`,
      name:'John Taylor',
    }
  ]
};

$(".timeline").html(template(context));