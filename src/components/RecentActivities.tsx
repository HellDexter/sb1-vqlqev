import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { MessageSquare, FileText, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

const activities = [
  {
    type: 'message',
    title: 'Nová zpráva od Jana Nováka',
    time: new Date(2024, 1, 15, 14, 30),
    icon: MessageSquare,
  },
  {
    type: 'contract',
    title: 'Smlouva podepsána - Bar U Modré hvězdy',
    time: new Date(2024, 1, 15, 13, 15),
    icon: FileText,
  },
  {
    type: 'location',
    title: 'Nové místo přidáno - Restaurace Na Růžku',
    time: new Date(2024, 1, 15, 11, 45),
    icon: MapPin,
  },
  {
    type: 'meeting',
    title: 'Schůzka potvrzena - Kavárna Central',
    time: new Date(2024, 1, 15, 10, 0),
    icon: Calendar,
  },
];

export function RecentActivities() {
  return (
    <List>
      {activities.map((activity, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <activity.icon size={20} />
          </ListItemIcon>
          <ListItemText
            primary={activity.title}
            secondary={
              <Typography variant="body2" color="text.secondary">
                {format(activity.time, 'PPp', { locale: cs })}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}