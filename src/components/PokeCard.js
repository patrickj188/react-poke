import React from "react";
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, } from '@mantine/core';
import '../components/style/pokeCardStyle.css'
import { getTypeColor } from "../util/colors";


const PokeCard = ({ name, img, species, description, onClick, isOnTeam, type }) => {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div className='pokeCard' style={{ width: 340, margin: 'auto' }}>
            <Card  shadow="sm" p="lg">
                <Card.Section>
                    <Image src={img} alt="" />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.md }}>
                    <Text weight={500}>{name}</Text>
                    <Badge color="pink" variant="light">
                        {species}
                    </Badge>
                </Group>

                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {description}
                </Text>
                {type.map((t) => (
                    <Badge key={t} color={getTypeColor(t)} variant="light">
                        {t}
                    </Badge>
                ))}

                <Button onClick={() => { onClick(name) }} variant="light" color={isOnTeam ? 'red' : 'blue'} fullWidth style={{ marginTop: 14 }}>
                    {isOnTeam ? 'Remove from team' : 'Add to team'}
                </Button>
            </Card>
        </div>

    )
}

export default PokeCard;