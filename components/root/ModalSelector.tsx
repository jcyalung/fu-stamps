"use client";

import { useEffect, useState } from "react";
import { RootModal } from "./RootModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TABLES } from "@/constants";

export default function ModalSelector() {
    const [verification, setVerification] = useState<number | null>(null); 
    const supabase = createClientComponentClient();
    useEffect(() => {
      const getVerification = async () => {
        const {
            data : { session },
            error : sessionError,
        } = await supabase.auth.getSession();
        // no session was found
        if(!session) {
            setVerification(0);
            return;
        }
        const { data } = await supabase
        .from(TABLES.USERS)
        .select("verification")
        .single();

        setVerification(data?.verification ?? 0);
      }  
        // initial fetch
        getVerification();

        // subscribe to auth state changes
        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
          getVerification();
        });

        return () => {
            subscription.subscription.unsubscribe();
        }
    }, [supabase]);
    return <RootModal verification={verification} />
}