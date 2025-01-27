export interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export interface State {
    hasError: boolean;
}