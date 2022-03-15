import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  //const [session] = useSession();

  function handleSubscribe() {

  }

  return (
    <button 
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  ) 
}