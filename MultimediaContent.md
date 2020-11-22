RegisteredUser.getTotal doesn't need to make the decision of what property get
from MultimediaContent. It would be much easier if MultimediaContent
received via the constructor a price property. When creating it the object
that creates it will know if the price property should be the streaming price,
the download price or some fee from the premium content.
This way it would change the snippet to:

```javascript
class RegisteredUser {
  constructor(services = []) {
    this.services = services;
  }

  getTotal() {
    const total = this.services.reduce((acc, service) => {
      const multimediaContent = service.getMultimediaContent();

      acc + multimediaContent.price;
    }, 0);

    return total;
  }
}
```
