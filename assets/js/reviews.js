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
      date: 'July 2018',
      comment: `Hi we had a fab week at this well equipped cottage. Garden was great very sheltered. We made use of 
      all the handy beach equipment to go to Kingsbarns beach.`,
      name: 'Irene W',
    },
    {
      title: 'Second visit',
      rating: 5,
      date: 'July 2018',
      comment: `Our second visit to Garden Cottage was every bit as special as the first - this time we had a short weekend break for a birthday celebration and were delighted
      to be greeted with a festive wreath on the front door and a beautiful Christmas tree when we walked in. The property is just perfect for family celebrations with sociable 
      living space and the luxurious bedrooms. Even the dog, Bonnie, got very excited when we arrived and ran circles around the back garden! We cannot recommend this accommodation 
      highly enough and can’t wait to return in the summer for a longer break.`,
      name: 'Coleena B',
    }
  ]
};

$(".timeline").html(template(context));