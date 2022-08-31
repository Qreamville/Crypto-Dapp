import { createContext, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

declare var window: any;
interface IContext {
  commonStyles: string;
  connectWallet: any;
}

const state = {
  commonStyles:
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white",
  connectWallet: null,
};

const TransactionContext = createContext<IContext>(state);

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({
    provider,
    signer,
    transactionContract,
  });
};

type Props = {
  children: JSX.Element;
};

const TransactionProvider = ({ children }: Props) => {
  const isWalletConnected = async () => {
    if (!window.ethereum) return alert("Please install metamask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    console.log(accounts);
  };

  useEffect(() => {
    isWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider value={state}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(TransactionContext);
};

export default TransactionProvider;
