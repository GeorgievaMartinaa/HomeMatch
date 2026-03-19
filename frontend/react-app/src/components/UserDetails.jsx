import {Item, ItemContent, ItemDescription, ItemHeader, ItemSeparator, ItemTitle} from "@/components/ui/item.jsx";

export default function UserDetails({data}) {
    return (
        <Item className="">
            <ItemHeader className='font-bold text-xl text-accent'>Информации за корисникот</ItemHeader>
            <ItemSeparator/>
            <div className="flex gap-20">
                <div className="flex flex-col gap-2">
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Корисник:</ItemTitle>
                        <ItemDescription>{data.firstName} {data.lastName}</ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Корисничко име:</ItemTitle>
                        <ItemDescription>{data.username}</ItemDescription>
                    </ItemContent>
                </div>
                <div className="flex flex-col gap-2">
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Емаил адреса:</ItemTitle>
                        <ItemDescription>{data.email} </ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Телефонски број:</ItemTitle>
                        <ItemDescription>{data.phoneNumber}</ItemDescription>
                    </ItemContent>
                </div>
                <div className="flex flex-col gap-2">
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Датум на раѓање:</ItemTitle>
                        <ItemDescription>{data.birthDate} </ItemDescription>
                    </ItemContent>
                    <ItemContent className="flex flex-row gap-2">
                        <ItemTitle>Години:</ItemTitle>
                        <ItemDescription>{data.age}</ItemDescription>
                    </ItemContent>
                </div>
            </div>
            <div className="w-full">
                <ItemContent className="flex text-start gap-2">
                    <ItemTitle>Повеќе информации за корисникот:</ItemTitle>
                    <ItemDescription className="w-full">{data.aboutMe} </ItemDescription>
                </ItemContent>
            </div>
        </Item>
    )
}