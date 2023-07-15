
interface IFooterProps {
    className: string;
    text: string;
    href?: string;
    user: string;

}
export default function Footer({ className, text, user, href }: IFooterProps) {
    return (
        <footer className={className}>
     {text} <a href={href} target="_blank" rel="noopener noreferrer">{user}</a>🚀
      </footer>
    );
  }