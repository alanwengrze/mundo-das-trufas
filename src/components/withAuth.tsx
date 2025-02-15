'use client'; 
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';

export default function WithAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // Verifica se a sessão foi carregada e se o usuário não é admin
      if (status !== 'loading' && session?.user.role !== 'ADMIN') {
        router.push('/public'); // Redireciona para a página pública
      }
    }, [session, status, router]);

    // Exibe um loading enquanto a sessão está sendo carregada
    if (status === 'loading') {
      return <p>Carregando...</p>;
    }

    // Se o usuário for admin, renderiza o componente protegido
    if (session?.user.role === 'ADMIN') {
      return <Component {...props} />;
    }

    // Caso contrário, não renderiza nada (o redirecionamento já foi feito)
    return null;
  };
}