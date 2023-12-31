import '../globals.css';
import AuthNavbar from '../../../components/AuthNavbar';
import Center from '@/components/Center';

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Center>
                <AuthNavbar />
                {children}
            </Center>
        </>
    );
}
