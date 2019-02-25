import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Sandbox from '@/components/Sandbox'
import Configure from '@/components/Configure'
import Procedures from '@/components/Procedures'
import View from '@/components/View'
import Login from '@/components/Login'

function auth({ next, router }) {
  console.log('ran!')
  if (!localStorage.getItem('jwt')) {
    return router.push({ name: 'Login' });
  }

  return next();
}


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/configure',
      name: 'Configure',
      component: Configure,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/procedures',
      name: 'Procedures',
      component: Procedures,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/view',
      name: 'View',
      component: View,
      meta: {
        middleware: auth
      }
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});


export default router
