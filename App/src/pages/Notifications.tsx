import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { Bell, Check, Trash2, Folder, GitPullRequest, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

interface NotificationItem {
  id: string;
  type: 'collab' | 'pr' | 'mention' | 'system';
  title: string;
  text: string;
  time: string;
  unread: boolean;
  project: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', type: 'collab', title: 'New Member Joined', text: 'Sarah Connor joined DevCollab Client workspace', time: '10m ago', unread: true, project: 'DevCollab Client' },
    { id: '2', type: 'pr', title: 'PR Review Requested', text: 'Alex Johnson requested your review on routing config', time: '1h ago', unread: true, project: 'DevCollab Client' },
    { id: '3', type: 'mention', title: 'Mentioned in Conversation', text: 'You were tagged by David Miller: "Should we use Redis helper here?"', time: '4h ago', unread: false, project: 'GraphQL Proxy Server' },
    { id: '4', type: 'system', title: 'Plan Upgrade Confirmed', text: 'Congratulations! Your DevCollab Pro trial is active.', time: '1 day ago', unread: false, project: 'Billing' },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast.success('Marked all notifications as read.');
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.info('Notifications feed cleared.');
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, unread: !n.unread };
      }
      return n;
    }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'collab': return <Folder className="h-4.5 w-4.5 text-indigo-400" />;
      case 'pr': return <GitPullRequest className="h-4.5 w-4.5 text-violet-400" />;
      case 'mention': return <MessageSquare className="h-4.5 w-4.5 text-amber-400" />;
      default: return <Bell className="h-4.5 w-4.5 text-zinc-400" />;
    }
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="primary" size="sm" className="h-5 px-2 text-[10px]">
                  {unreadCount} unread
                </Badge>
              )}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Stay updated with code changes and collaborations.</p>
          </div>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2.5">
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Check className="h-4 w-4" />}
              onClick={handleMarkAllRead}
            >
              Mark all read
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<Trash2 className="h-4 w-4" />}
              onClick={handleClearAll}
              className="text-zinc-500 hover:text-zinc-300"
            >
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Notifications List Stack */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <Card 
              key={notif.id} 
              padding="none" 
              className={`overflow-hidden transition-all duration-200 border-zinc-800/80 hover:border-zinc-700/80 ${
                notif.unread ? 'bg-zinc-900/50' : 'bg-zinc-900/10'
              }`}
            >
              <div className="flex gap-4 p-4 items-start">
                <div className="p-2 bg-zinc-950 border border-zinc-900 rounded-xl mt-0.5 flex-shrink-0">
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-0.5">
                    <h4 className="text-xs font-bold text-zinc-200">{notif.title}</h4>
                    <span className="text-[9px] text-zinc-500 font-medium whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{notif.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wide">{notif.project}</span>
                    {notif.unread && (
                      <>
                        <span className="text-[10px] text-zinc-700">•</span>
                        <button 
                          onClick={() => handleToggleRead(notif.id)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium hover:underline cursor-pointer"
                        >
                          Mark read
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bell className="h-8 w-8 text-zinc-650" />}
          title="All caught up"
          description="You don't have any notifications right now. Check back later for activity updates."
        />
      )}
    </AppLayout>
  );
};

export default Notifications;
