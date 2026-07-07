
import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Sparkles, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';

const PricingPage = () => {
  const handleUpgrade = (plan: string) => {
    toast.success(`Redirecting to Stripe checkout for "${plan}"... (UI mockup only)`);
  };

  const plans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      desc: 'Essential collaborative space for small developer teams.',
      features: [
        'Up to 3 active projects',
        'Up to 5 team members per project',
        'Standard Kanban issue tracking board',
        'Community support forums',
      ],
      buttonText: 'Current Plan',
      isCurrent: true,
      variant: 'outline' as const,
    },
    {
      name: 'DevCollab Pro',
      price: '$9',
      period: 'per user / month',
      desc: 'Unlimited power for high-growth engineering squads.',
      features: [
        'Unlimited active projects',
        'Unlimited members per project',
        'Custom task board tags & swimlanes',
        'Real-time project chats & memos',
        'Priority Slack & email support (24h)',
        'Stripe billing invoices management',
      ],
      buttonText: 'Upgrade to Pro',
      isCurrent: false,
      variant: 'primary' as const,
      popular: true,
    }
  ];

  const comparisons = [
    { feature: 'Active Projects', free: '3', pro: 'Unlimited' },
    { feature: 'Members per Project', free: '5', pro: 'Unlimited' },
    { feature: 'Kanban Issue Boards', free: '✓ (Basic)', pro: '✓ (Advanced)' },
    { feature: 'Project Chat Rooms', free: '✗', pro: '✓' },
    { feature: 'File Attachment Size Limit', free: '10 MB', pro: '5 GB' },
    { feature: 'Support SLA', free: 'Best effort', pro: '24h guaranteed' }
  ];

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="text-center py-6 space-y-3 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-semibold tracking-wider uppercase border border-indigo-500/20 bg-indigo-500/5 rounded-full px-3.5 py-1">
          Flexible Billing
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-150 tracking-tight">Simple, developer-friendly pricing</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Collaborate for free or unlock unlimited scale, team chats, and priority support channels.
        </p>
      </div>

      {/* Plans comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
        {plans.map((plan, idx) => (
          <Card 
            key={idx} 
            className={`flex flex-col justify-between relative border-zinc-800/80 bg-zinc-900/30 ${
              plan.popular ? 'ring-1 ring-indigo-500 shadow-indigo-500/5' : ''
            }`}
            padding="lg"
          >
            {plan.popular && (
              <div className="absolute -top-3 right-6">
                <Badge variant="primary" className="font-bold flex items-center gap-1 text-[9px] tracking-wider uppercase py-1">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-zinc-200">{plan.name}</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-zinc-100">{plan.price}</span>
                <span className="text-[10px] text-zinc-550 font-semibold uppercase">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-zinc-900">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <span className="flex-shrink-0 text-indigo-400 font-bold bg-indigo-500/10 p-0.5 rounded-full border border-indigo-500/20 text-[9px]">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Button 
                variant={plan.variant} 
                className="w-full font-bold"
                disabled={plan.isCurrent}
                onClick={() => handleUpgrade(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-4xl mx-auto pt-10 space-y-4">
        <h3 className="text-sm font-bold text-zinc-300">Detailed Feature Comparison</h3>
        
        <div className="overflow-x-auto rounded-xl border border-zinc-900 bg-zinc-950/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/30 text-zinc-400 font-semibold select-none">
                <th className="px-5 py-3">Features & Limits</th>
                <th className="px-5 py-3">Starter Plan</th>
                <th className="px-5 py-3">Pro Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50 text-zinc-300">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/10">
                  <td className="px-5 py-3 font-medium text-zinc-200">{row.feature}</td>
                  <td className="px-5 py-3 text-zinc-400">{row.free}</td>
                  <td className="px-5 py-3 font-semibold text-indigo-400">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stripe Badge Info */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-550 pt-2 font-medium">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Secure checkout powered by Stripe. No contracts, cancel anytime.</span>
        </div>
      </div>
    </AppLayout>
  );
};

export default PricingPage;
