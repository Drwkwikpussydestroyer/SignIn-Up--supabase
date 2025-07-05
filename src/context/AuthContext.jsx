import { createContext, useEffect, useContext, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);  

  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("There was a problem signing up:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  const signInUser = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { success: false, error };
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("There was an error signing out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, signUpNewUser, signInUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );

  
};

export const UserAuth = () => useContext(AuthContext);
