for run on android :

please run --> npm run start

I used expo becuase I am usually use react native cli , this turn I tend to use expo . 
They are very similar at all.


for decreasing size of image, before sending to server, you can uncommen below code :
// const manipulateResult = await manipulateAsync(
  //   userData.image,
  //   [],
  //   { compress: 0.2 } // from 0 to 1 "1 for best quality"
  // );
  // resizedImage = manipulateResult.uri;
  and use resizedImage instead  userData.image


  *******  bug in Api post lists: "you have mistake , for example count is 10 but max values is // 5 ", response.count,response?.results.length);
