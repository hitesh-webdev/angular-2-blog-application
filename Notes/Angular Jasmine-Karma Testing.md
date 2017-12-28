# Angular 2+ Applications Testing using Jasmine with Karma

## Jasmine

If your test uses some external resource, like the network or a database, it’s not a unit test.

Jasmine is a javascript testing framework that supports a software development practice called 
**Behaviour Driven Development**.

The `describe(string, function)` function defines what we call a **Test Suite**, a collection of individual Test Specs.

The `it(string, function)` function defines an **individual Test Spec**, this contains one or more Test Expectations.

The `expect(actual)` expression is what we call an **Expectation**. The `matcher(expected)` expression is what we call 
a **Matcher**. It does a _boolean comparison_ with the expected value passed in vs. the actual value passed to the 
expect function, if they are false the spec fails.


Jasmine comes with a few **pre-built matchers** like:

```javascript
expect(array).toContain(member);
expect(fn).toThrow(string);
expect(fn).toThrowError(string);
expect(instance).toBe(instance);
expect(mixed).toBeDefined();
expect(mixed).toBeFalsy();
expect(mixed).toBeNull();
expect(mixed).toBeTruthy();
expect(mixed).toBeUndefined();
expect(mixed).toEqual(mixed);
expect(mixed).toMatch(pattern);
expect(number).toBeCloseTo(number, decimalPlaces);
expect(number).toBeGreaterThan(number);
expect(number).toBeLessThan(number);
expect(number).toBeNaN();
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(number);
expect(spy).toHaveBeenCalledWith(...arguments);
```

<br>

Sometimes in order to test a feature we need to perform some **setup and teardown** (for cleaning up):

- `beforeAll`
This function is called once, before all the specs in describe test suite are run.

- `afterAll`
This function is called once after all the specs in a test suite are finished.

- `beforeEach`
This function is called before each test specification, it function, has been run.

- `afterEach`
This function is called after each test specification has been run.

<br>

## Karma

Karma is a tool which lets us _spawn browsers_ and run jasmine tests inside of them all from the **command line**. 
The results of the tests are also displayed on the command line. Karma can also watch your development files 
for changes and **re-run the tests automatically**.
Karma lets us run jasmine tests as part of a *development tool chain* which requires tests to be runnable and 
results inspectable via the command line.
It’s not necessary to know the internals of how Karma works. When using the Angular CLI it handles the 
configuration for us.

We can run Jasmine tests in a browser ourselves by setting up and loading a HTML file, but more commonly we use 
a command line tool called Karma. 

> Karma handles the process of creating HTML files, opening browsers and running tests and returning the results of 
those tests to the command line.

> To run all the tests in our application we simply type **ng test** in our project root.This runs all the tests 
in our project in Jasmine via Karma.

<br>

You can _disable tests_ without commenting them out by just _pre-pending_ **x** to the describe or it functions, 
like so:

```javascript
xdescribe('Hello world', () => { 
  xit('says hello', () => { 
    expect(helloWorld())
        .toEqual('Hello world!');
  });
});
```

Conversely you can also _focus_ on specific tests by pre-pending with **f**, like so:

```javascript
fdescribe('Hello world', () => { 
  fit('says hello', () => { 
    expect(helloWorld())
        .toEqual('Hello world!');
  });
});
```

<br>

## Testing a class

Everything in Angular is an **instance of a class**, be it a _Component, Directive, Pipe_ and so on. So once you know 
how to test a basic class you can test everything.

```javascript
import {AuthService} from './auth.service';

describe('Service: Auth', () => {

  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated when there is a token', () => {
    localStorage.setItem('token', '1234');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false from isAuthenticated when there is no token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

});
```

<br>

However our code often requires other code to work, it has **dependencies**. So how we write isolated tests for pieces 
of code which by nature are not isolated and need dependencies.

## Testing with the real AuthService

```javascript
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

describe('Component: Login', () => {

  let component: LoginComponent;
  let service: AuthService;

  beforeEach(() => { 
    service = new AuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => { 
    localStorage.removeItem('token');
    service = null;
    component = null;
  });


  it('canLogin returns false when the user is not authenticated', () => {
    expect(component.needsLogin()).toBeTruthy();
  });

  it('canLogin returns false when the user is not authenticated', () => {
    localStorage.setItem('token', '12345'); 
    expect(component.needsLogin()).toBeFalsy();
  });
});
```

<br>

However imagine if LoginComponent required a number of other dependencies in order to run, we would need to know 
the inner workings of a number of other classes just to test our LoginComponent.

This results in **Tight Coupling** and our tests being very _Brittle_, i.e. likely to break easily. For example if 
the AuthService changed how it stored the token, from localStorage to cookies then the LoginComponent test would 
break since it would still be setting the token via localStorage. This is why we need to test classes in **isolation**, 
we just want to worry about LoginComponent. 

We achieve this by **Mocking our dependencies**. Mocking is the act of creating something that looks like the dependency 
but is something we control in our test.


## Mocking with fake classes

We can create a **fake AuthService** called MockedAuthService which just returns whatever we want for our test.
We can even remove the AuthService import if we want, there really is no dependency on anything else.

```javascript
import {LoginComponent} from './login.component';

class MockAuthService { 
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}

describe('Component: Login', () => {

  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => { 
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });


  it('canLogin returns false when the user is not authenticated', () => {
    service.authenticated = false; 
    expect(component.needsLogin()).toBeTruthy();
  });

  it('canLogin returns false when the user is not authenticated', () => {
    service.authenticated = true; 
    expect(component.needsLogin()).toBeFalsy();
  });
});
```

<br>

## Mocking by overriding functions

Sometimes creating a complete fake copy of a real class can be complicated, time consuming and unnecessary.

We can instead simply **extend the class and override one or more specific function** in order to get them to return 
the test responses we need, like so:

```javascript
class MockAuthService extends AuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
}
```

<br>

## Mock by using a real instance with Spy

A **Spy** is a feature of Jasmine which lets you take an existing class, function, object and mock it in such a way 
that you can **control what gets returned from functions**.

By using the spy feature of jasmine we can make _any function return anything we want_:

```javascript
spyOn(service, 'isAuthenticated').and.returnValue(false);
```

In our example above we make the `isAuthenticated` function(of the AuthService) return false or true in each test 
spec according to our needs.

> We can even check to see if the isAuthenticated function was called.

```javascript
expect(service.isAuthenticated).toHaveBeenCalled();
```

<br>

## Angular Test Bed

The Angular Test Bed (ATB) is a higher level **Angular Only testing framework** that allows us to easily test behaviours 
that depend on the Angular Framework.

> In the `beforeEach` function for our test suite we _configure a testing module_ using the **TestBed class**.

We configure it in exactly the same way as we would configure a normal **NgModule**. In this case we pass in the 
LoginComponent in the declarations and the AuthService in the providers.

```javascript
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

describe('Component: Login', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });
  });
});
```

<br>

Once the ATB is setup we can then use it to _instantiate components and resolve dependencies_, like so:

```javascript
import {TestBed, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";

describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>; 
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent); 

    // get test component from the fixture
    component = fixture.componentInstance; 

    // UserService provided to the TestBed
    authService = TestBed.get(AuthService); 

  });
});
```

<br>

1. A **fixture** is a _wrapper_ for a component and it’s template.

2. We create an instance of a component fixture through the TestBed, this injects the AuthService into the 
component constructor.

3. We can find the _actual component_ from the `componentInstance` on the fixture.

4. We can get resolve dependencies using the TestBed injector by using the **get** function.

<br>

## We will continue to use ATB because:

- The ATB lets us test parts of our code as if it is being run in the **context of a real Angular app**.

- It allows us to test the _interaction_ of a **directive or component with it’s template**.

- It allows us to easily test **change detection**.

- It allows us to test and use Angulars DI framework.

- It allows us to test using the **NgModule configuration** we use in our application.

- It allows us to test **user interaction** via clicks & input fields.

<br>

## Testing Change Detection

Trying to test whether changes in the state of our application trigger changes in the view without the Angular 
Test Bed is complicated. However with the ATB it’s much simpler.

```javascript
import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from "./auth.service";
import {DebugElement} from "@angular/core"; 
import {By} from "@angular/platform-browser"; 

describe('Component: Login', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let el: DebugElement; 

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // UserService provided to the TestBed
    authService = TestBed.get(AuthService);

    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('a')); 
  });
});
```

We’ve imported a few more classes that are needed when interacting with a components view, **DebugElement** and **By**.

We have another variable called `el` which holds something called a **DebugElement**.

We store a reference to a DOM element in our `el` variable.

The fixture as well as holding an instance of the component also holds a reference to something called a 
DebugElement, this is a _wrapper to the low level DOM element_ that represents the _components view_, via the 
`debugElement` property.


We can find out the _text content_ of the tag by calling `el.nativeElement.textContent.trim()`, we’ll be using that 
snippet in the test specs later on.

> fixture is a wrapper for our *components environment* so we can control things like change detection.

To **trigger change detection** we call the function `fixture.detectChanges()`, now we can update our test spec to:

```javascript
it('login button hidden when the user is authenticated', () => {
  expect(el.nativeElement.textContent.trim()).toBe('');
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
});
```

> We initially expect the text inside the a tag to be blank.

That’s because when Angular first loads no change detection has been triggered and therefore the view doesn’t show 
either the Login or Logout text.

> When performing testing we need to **call component lifecycle hooks ourselves**, like `ngOnInit()`. Angular won’t do 
this for us in the _test environment_.

<br>

## Testing asynchronous code

### fakeAsync and tick

```javascript
it('Button label via fakeAsync() and tick()', fakeAsync(() => { 
  expect(el.nativeElement.textContent.trim()).toBe('');
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  component.ngOnInit();

  tick(); 
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Logout');
}));
```

Like the async function the `fakeAsync` function executes the code inside it’s body in a **special fake async test zone**. 
This intercepts and **keeps track of all promises** created in it’s body.

The `tick()` function **blocks execution and simulates the passage of time** until all pending asynchronous activities 
complete.

So when we call `tick()` the application sits and waits for the promise returned from `isAuthenticated` to be resolved 
and then lets execution move to the next line.

The code above is now layed out linearly, as if we were **executing synchronous code**, there are _no callbacks_ to 
confuse the mind and everything is simpler to understand.

> fakeAsync does have some drawbacks, it **doesn’t track XHR requests** for instance.

<br>

### async and whenStable

```javascript
it('Button label via async() and whenStable()', async(() => { 
  fixture.detectChanges();
  expect(el.nativeElement.textContent.trim()).toBe('Login');
  spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
  fixture.whenStable().then(() => { 
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
  component.ngOnInit();
}));
```

This async function executes the code inside it’s body in a **special async test zone**. This intercepts and keeps 
track of all promises created in it’s body.

Only when all of those pending promises have been resolved does it then resolves the promise returned from 
`whenStable`.

<br>

## Testing input/output & trigger events on the view

```javascript
it('Entering email and password emits loggedIn event', () => {
  let user: User;
  loginEl.nativeElement.value = "test@example.com"; 
  passwordEl.nativeElement.value = "123456";

  component.loggedIn.subscribe((value) => user = value);

  submitEl.triggerEventHandler('click', null); 

  expect(user.email).toBe("test@example.com");
  expect(user.password).toBe("123456");
});
```

> We can test outputs by subscribing to an EventEmitters observable and storing the emitted values on local variables.

<br>

## Testing a directive

```javascript
// Directive
import {
    Directive,
    HostListener,
    HostBinding
} from '@angular/core';

@Directive({
  selector: '[hoverfocus]'
})
export class HoverFocusDirective {

  @HostBinding("style.background-color") backgroundColor: string;

  @HostListener('mouseover') onHover() {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseout') onLeave() {
    this.backgroundColor = 'inherit';
  }
}

// Component

import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {TestBed} from '@angular/core/testing';
import {HoverFocusDirective} from './hoverfocus.directive';

@Component({
  template: `<input type="text" hoverfocus>`
})
class TestHoverFocusComponent {
}

// Test File

describe('Directive: HoverFocus', () => {

  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, HoverFocusDirective]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('hovering over input', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('blue');

    inputEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('inherit');
  });
});
```

<br>

## Testing forms

We can easily unit test **model driven forms** in Angular by just testing the form model itself.

To test **template driven forms** in Angular we need to launch a full **end to end testing** environment and interact 
with a browser to test the form.

```javascript
it('email field validity', () => {
  let errors = {};
  let email = component.form.controls['email'];
  errors = email.errors || {};
  expect(errors['required']).toBeTruthy(); 
});
```

<br>

## Testing HTTP

We want the `Jsonp` and `Http` services to use the **MockBackend** instead of the real Backend, this is the underling 
code that actually sends and handles http.

By using the `MockBackend` we can intercept real requests and simulate responses with test data.

The configuration is slightly more complex since we are using a factory provider:

```javascript
{
  provide: Http, 
  useFactory: (backend, options) => new Http(backend, options), 
  deps: [MockBackend, BaseRequestOptions] 
}
```

1. We are configuring a dependency for the token `Http`.
2. The injector calls this function in order to return a new instance of the Http class. The arguments to the 
`useFactory` function are themselves injected in.
3. We define the dependencies to our useFactory function via the `deps` property.

> We will use the `promise` version of the search service that uses `JSONP` to get around the issue of **CORS**.

```javascript
describe('Service: Search', () => {

  let service: SearchService;
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule],
      providers: [
        SearchService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Jsonp,
          useFactory: (backend, options) => new Jsonp(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });

    backend = TestBed.get(MockBackend); 

    service = TestBed.get(SearchService); 
  });
});
```

1. We grab a reference to the `mock backend` so we can control the `http responses` from our test specs.
2. We grab a reference to the `SearchService`, this has been created using the `MockBackend` above.

<br>

## Using the MockBackend to simulate a response

```javascript
it('search should return SearchItems', fakeAsync(() => {
  let response = { 
    "resultCount": 1,
    "results": [
      {
        "artistId": 78500,
        "artistName": "U2",
        "trackName": "Beautiful Day",
        "artworkUrl60": "image.jpg",
      }]
  };

  backend.connections.subscribe(connection => { 
    connection.mockRespond(new Response(<ResponseOptions>{ 
      body: JSON.stringify(response)
    }));
  });

  // Perform a request and make sure we get the response we expect
  service.search("U2"); 
  tick(); 

  expect(service.results.length).toBe(1); 
  expect(service.results[0].artist).toBe("U2");
  expect(service.results[0].name).toBe("Beautiful Day");
  expect(service.results[0].thumbnail).toBe("image.jpg");
  expect(service.results[0].artistId).toBe(78500);


}));
```

1. We create some fake data we want the API to response with.
2. The mock backend connections property is an observable that _emits an connection_ every time an API request is made.
3. For every connection that is requested we tell it to mockRespond with our dummy data.
4. We use the `fakeAsync` method to execute in the special fake async zone and track pending promises.
5. We make the _asynchronous call_ to `service.search(…​)`
6. We issue a `tick()` which blocks execution and waits for all the _pending promises_ to be resolved.
7. We now know that the service has received and parsed the response so we can write some expectations.

<br>

## Testing Routing

To test routing we need a few components and a route configuration:

```javascript
import {Component} from "@angular/core";
import {Routes} from "@angular/router";

@Component({
  template: `Search`
})
export class SearchComponent {
}

@Component({
  template: `Home`
})
export class HomeComponent {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent}
];
```

Normally to setup routing in an Angular application we import the `RouterModule` and provide the routes to the 
`NgModule` with `RouterModule.withRoutes(routes)`.

However when testing routing we use the `RouterTestingModule` instead. This modules sets up the router with a 
**spy implementation** of the Location Strategy that _doesn’t actually change the URL_.

We also need to get the injected `Router` and `Location` so we can use them in the test specs.

```javascript
describe('Router: App', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)], 
      declarations: [
        HomeComponent,
        SearchComponent,
        AppComponent
      ]
    });

    router = TestBed.get(Router); 
    location = TestBed.get(Location); 

    fixture = TestBed.createComponent(AppComponent); 
    router.initialNavigation(); 
  });
});
```

1. We import our `RouterTestingModule` with our routes.
2. We grab a reference to the injected `Router`.
3. We grab a reference to the injected `Location`.
4. We ask the test bed to create an instance of our root `AppComponent`. We don’t need this reference in our test 
specs but we do need to create the root component with the router-outlet so the router has somewhere to insert 
components.
5. This sets up the location change listener and performs the initial navigation.

```javascript
it('navigate to "" redirects you to /home', fakeAsync(() => { 
  router.navigate(['']); 
  tick(); 
  expect(location.path()).toBe('/home'); 
}));
```

1. Routing is an **asynchronous activity** so we use one of the asynchronous testing methods at our disposal, in this case 
the `fakeAsync` method.
2. We trigger the router to navigate to the _empty path_.
3. We wait for all _pending promises_ to be resolved.
4. We can then inspect the path our application should be at with `location.path()`.

> This uses a spy implementation of Location which doesn’t trigger a request for a new URL but does let us know the 
target URL which we can use in our test specs.