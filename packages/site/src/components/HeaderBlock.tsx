import {Typography, Content, Button} from '@jobber/components';
import {useNavigate} from 'react-router-dom';

interface HeaderBlockProps {
  title: string;
  body: string;
  ctaLabel?: string;
  to?: string;
}
export const HeaderBlock = ({title, body, ctaLabel, to}: HeaderBlockProps) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: 80,
        color: 'var(--color-surface)',
        backgroundColor: 'var(--color-brand)',
      }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          color: 'var(--color-surface)',
          backgroundColor: 'var(--color-brand)',
          minHeight: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Content>
          <Typography size="extravagant" fontWeight="bold" fontFamily="display">
            {title}
          </Typography>
          <Typography size="larger">{body}</Typography>
          {to && ctaLabel && (
            <Button
              type="secondary"
              label={ctaLabel}
              onClick={() => navigate(to)}
            />
          )}
        </Content>
      </div>
    </div>
  );
};
