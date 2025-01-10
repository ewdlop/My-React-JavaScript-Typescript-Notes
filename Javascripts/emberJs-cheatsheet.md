# Ember.js Cheatsheet

## Project Generation & CLI
```bash
# Create new application
ember new my-app

# Generate components, routes, etc.
ember generate component my-component
ember g route about
ember g model user
ember g service session
ember g helper format-date
ember g adapter application

# Development server
ember serve
ember s

# Build for production
ember build --environment production
```

## Components
### Component Definition
```javascript
// app/components/user-profile.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UserProfileComponent extends Component {
  @tracked count = 0;

  @action
  increment() {
    this.count++;
  }
}
```

### Component Template
```handlebars
{{!-- app/components/user-profile.hbs --}}
<div class="user-profile">
  <h2>{{@name}}</h2>
  <p>Count: {{this.count}}</p>
  <button {{on "click" this.increment}}>Increment</button>
  {{yield}}
</div>
```

### Using Components
```handlebars
<UserProfile @name="John Doe">
  <p>Additional content</p>
</UserProfile>
```

## Routing
### Router Definition
```javascript
// app/router.js
Router.map(function() {
  this.route('about');
  this.route('posts', function() {
    this.route('new');
    this.route('post', { path: '/:post_id' });
  });
});
```

### Route Definition
```javascript
// app/routes/posts.js
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PostsRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('post');
  }
}
```

### Link Components
```handlebars
<LinkTo @route="posts">Posts</LinkTo>
<LinkTo @route="posts.post" @model={{post.id}}>View Post</LinkTo>
```

## Models & Data
### Model Definition
```javascript
// app/models/user.js
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('date') birthDate;
  @hasMany('post') posts;
  @belongsTo('company') company;
}
```

### Working with Models
```javascript
// Create
let user = this.store.createRecord('user', {
  name: 'John',
  birthDate: new Date()
});
await user.save();

// Read
let users = await this.store.findAll('user');
let user = await this.store.findRecord('user', 1);

// Update
user.name = 'Jane';
await user.save();

// Delete
await user.destroyRecord();
```

## Services
### Service Definition
```javascript
// app/services/session.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @tracked currentUser = null;

  login(user) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }
}
```

### Using Services
```javascript
import { service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service session;

  @action
  logout() {
    this.session.logout();
  }
}
```

## Helpers
### Custom Helper Definition
```javascript
// app/helpers/format-date.js
import { helper } from '@ember/component/helper';

export default helper(function formatDate([date], { format = 'short' } = {}) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: format }).format(date);
});
```

### Using Helpers
```handlebars
{{format-date @user.birthDate format="full"}}
```

## Actions & Events
### Component Actions
```javascript
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action
  handleClick(event) {
    // handle click
  }
}
```

### Template Events
```handlebars
<button {{on "click" this.handleClick}}>Click me</button>
<input {{on "input" this.handleInput}} value={{this.value}}>
```

## Computed Properties & Tracked Properties
### Tracked Properties
```javascript
import { tracked } from '@glimmer/tracking';

export default class MyComponent extends Component {
  @tracked count = 0;
  @tracked name = '';
}
```

### Getters (Computed Properties)
```javascript
export default class MyComponent extends Component {
  @tracked firstName = '';
  @tracked lastName = '';

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

## Testing
### Component Tests
```javascript
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | my-component', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<MyComponent />`);
    assert.dom('.my-component').exists();
  });
});
```

### Route Tests
```javascript
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, currentURL } from '@ember/test-helpers';

module('Acceptance | posts', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /posts', async function(assert) {
    await visit('/posts');
    assert.equal(currentURL(), '/posts');
  });
});
```

## Dependency Injection
### Injecting Services
```javascript
import { service } from '@ember/service';

export default class MyComponent extends Component {
  @service store;
  @service session;
  @service router;
}
```

## Best Practices
1. Use Octane features (tracked properties, @glimmer/component)
2. Favor composition over inheritance
3. Keep components small and focused
4. Use named arguments (@args) in components
5. Write tests for components and routes
6. Use services for shared state
7. Follow Ember's naming conventions
8. Use ember-cli for generating files
9. Keep routes simple, move complex logic to controllers or components
10. Use loading and error substates for better UX
