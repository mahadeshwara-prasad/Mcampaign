export async function generateStaticParams() {
    return [];
  }
  
  export default function Layout({ children }) {
    return (
      <div>
        {children}
      </div>
    );
  }