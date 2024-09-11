import { Box, Typography, Content, Button} from '@jobber/components';
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
    <Box
      padding="extravagant"
      background="base-blue--900"
      >
      <div
        style={{
          width: '100%',
          height: '100%',
          color: 'var(--color-base-white)',
          minHeight: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Content spacing='large'>
          <Typography element={"h1"} size="extravagant" fontWeight="bold" fontFamily="display">
            {title}
          </Typography>
          <Typography size="large">{body}</Typography>
          {to && ctaLabel && (
            <Button
              type="secondary"
              size="large"
              label={ctaLabel}
              onClick={() => navigate(to)}
            />
          )}
        </Content>
      </div>
    </Box>
  );
};
