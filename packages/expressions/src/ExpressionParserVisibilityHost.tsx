import { useEffect, useMemo } from "react";
import { useExpressionParser } from "./useExpressionParser";


export const ExpressionParserVisibilityHost: React.FC<{
    onVisibilityCalculated?: (visiblity: boolean) => void,
    visible?: string | boolean, attributeKey?: string,
    onLoading?: React.FC<any>
}> = ({ children, visible, attributeKey, onVisibilityCalculated, onLoading:Spinner}) => {

    const { data, isLoading, error } = useExpressionParser<boolean>(typeof visible === "string" ? visible : undefined);



    const showShow = useMemo(() => {
        if (typeof visible === "boolean" && visible === false) {
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Hiding as visibility is false")

            
            return false;
        }

        if (isLoading) {
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Hiding as visibility is loading")

            return undefined;
        }

        if (typeof data === "boolean" && data === false) {
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Hiding as visibility is calculated to false")
            
            return false;
        }


        if (error) {
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Hiding as visibility had error on calculation", error)

            return undefined;
        }

        if (typeof data === "undefined")
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Showing as visibility not provided", [visible, data]);
        else
            console.debug("ExpressionParserVisibilityHost " + attributeKey + ": Showing as visibility is calculated", [visible, data]);

       

        return true;
    }, [visible, data, isLoading, error]);


    useEffect(() => {
        if (onVisibilityCalculated && typeof showShow === "boolean")
            onVisibilityCalculated(showShow);

    }, [showShow])

    if (showShow)
        return <>{children}</>

    if (Spinner)
        <Spinner />

    return null;
}