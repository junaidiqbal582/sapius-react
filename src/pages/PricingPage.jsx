import { navigate } from '../lib/router.js'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    blurb: 'For solo operators testing the waters.',
    features: ['1 workspace', 'Basic demos', 'Email support'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$79',
    blurb: 'For teams running live product tours.',
    features: ['Unlimited demos', 'Onboarding walks', 'Priority chat'],
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$149',
    blurb: 'For orgs with multiple product surfaces.',
    features: ['Custom playbooks', 'SSO-ready', 'Dedicated success'],
  },
]

export default function PricingPage({ user }) {
  return (
    <main className="page-main panel-enter">
      <p className="eyebrow">Pricing</p>
      <h1 className="page-title" data-demo-id="pricing-title">
        Simple plans that scale with you
      </h1>
      <p className="lede">
        Pick a plan when you are ready. Signed-in visitors can start a trial from any card.
      </p>

      <div className="plan-grid" data-demo-id="pricing-plans">
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            className={plan.featured ? 'plan-card featured' : 'plan-card'}
            data-demo-id={`plan-${plan.id}`}
          >
            <h2>{plan.name}</h2>
            <p className="plan-price">
              {plan.price}
              <span>/mo</span>
            </p>
            <p className="plan-blurb">{plan.blurb}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className={plan.featured ? 'btn btn-primary' : 'btn btn-ghost'}
              data-demo-id={`btn-choose-${plan.id}`}
              onClick={() => navigate(user ? 'workspace' : 'home')}
            >
              {user ? 'Start trial' : 'Sign in to start'}
            </button>
          </article>
        ))}
      </div>
    </main>
  )
}
